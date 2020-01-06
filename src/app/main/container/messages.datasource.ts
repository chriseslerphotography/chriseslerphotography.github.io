/**
 * Custom data source for virtual scroll
 * hooks into NGXS store actions and service
 * fetches new data when scroll is towards the bottom
 *
 * inspiration from:
 * https://alligator.io/angular/infinite-scroll/
 */

import { CollectionViewer, DataSource } from '@angular/cdk/collections';

import {
    MessagesState,
    MessageModel,
    MSFetchMessages
} from '../store/messages.state';

import { Subscription, BehaviorSubject, Observable } from 'rxjs';

import { Select, Selector, Store } from '@ngxs/store';
import { NgZone } from '@angular/core';

export class MessagesDataSource extends DataSource<MessageModel | undefined> {
    // NGXS store items
    @Select(MessagesState.getPageToken) pageToken$: Observable<string | null>;
    @Select(MessagesState.getDeleted) deleted$: Observable<number | null>;

    // dataStream is a NGXS Stream
    @Select(MessagesState.getMessages) dataStream: Observable<MessageModel[]>;

    // subscription container
    private subscription: Subscription = new Subscription();

    private limitSize = 50; // number of items per 'page'
    private lastPage = 0; // last page loaded
    private pageToken: string | null = null; // page token returned from last request
    // tslint:disable-next-line: no-inferrable-types
    private deleted: number = 0;

    constructor(private store: Store) {
        super(); // call DataSource constructor

        // add NGXS Store subscriptions

        this.subscription.add(
            this.pageToken$.subscribe(pageToken => {
                this.pageToken = pageToken;
            })
        );

        this.subscription.add(
            this.deleted$.subscribe(deleted => {
                this.deleted = deleted;
            })
        );

        // get first batch
        this._fetchMessagesPage();
    }

    // helper to fetch data from store
    private _fetchMessagesPage(): void {
        this.store.dispatch(
            new MSFetchMessages(this.limitSize, this.pageToken)
        );
    }

    // helper to find what page an item is on
    private _getPageForIndex(i: number): number {
        return Math.floor(i / this.limitSize);
    }

    connect(
        collectionViewer: CollectionViewer
    ): Observable<
        (MessageModel | undefined)[] | ReadonlyArray<MessageModel | undefined>
    > {
        //console.log('CDATA SOURCE CONNECT');
        this.subscription.add(
            collectionViewer.viewChange.subscribe(range => {
                //console.log('COLLECTION VIEWER :: VIEW CHANGE', range);
                // Update the data
                const currentPage = this._getPageForIndex(
                    range.end + this.deleted
                );
                // check if we've loaded page, and if not get data
                if (currentPage > this.lastPage) {
                    this.lastPage = currentPage;
                    this._fetchMessagesPage();
                }
            })
        );

        return this.dataStream;
    }

    disconnect(collectionViewer: CollectionViewer): void {
        // unsubscribe from all container subscriptions
        this.subscription.unsubscribe();
    }
}
