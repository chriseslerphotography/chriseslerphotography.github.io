import {
    Component,
    OnInit,
    HostBinding,
    OnDestroy,
    ViewChild,
    ChangeDetectorRef,
    AfterViewInit,
    ElementRef
} from '@angular/core';

import {
    Select,
    Store
} from '@ngxs/store';

import {
    MessagesState,
    MSRemoveMessage,
    MessageModel
} from '../store/messages.state';

import {
    Observable,
    Subscription
} from 'rxjs';

import { MessagesDataSource } from './messages.datasource';
import { CdkVirtualScrollViewport, CdkVirtualForOf, ScrollDispatcher } from '@angular/cdk/scrolling';
import { skip } from 'rxjs/operators';
import { ListRange } from '@angular/cdk/collections';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
    // tslint:disable-next-line: variable-name
    @HostBinding('class.app-main') _hostClass = true;

    @Select(MessagesState.getError) error$: Observable<any>;
    error: any = {};

    @Select(MessagesState.getDeleted) deleted$: Observable<number | null>;

    @ViewChild(CdkVirtualScrollViewport, {static: false}) scrollViewport: CdkVirtualScrollViewport;
    @ViewChild('messagesScrollViewport', {static: false, read: ElementRef}) scrollViewportEl: ElementRef;

    private subscription: Subscription = new Subscription();

    messagesDataSource: MessagesDataSource;

    // EVENTS
    messageEvent(event: any) {
        // console.log('MESSAGE EVENT', event);
        if (event.animationDone) {
            this.store.dispatch(
                new MSRemoveMessage(event.message.id)
            );
        }
    }

    // CONSTRUCTOR AND ANGULAR SPECIFIC METHODS
    constructor(
        private store: Store,
        private cdRef: ChangeDetectorRef
    ) {
        // initialize custom datasource, passing in NGXS store
        this.messagesDataSource = new MessagesDataSource(store);
    }

    ngOnInit() {

        this.subscription.add(this.error$.subscribe(error => {
            this.error = error;
        }));

        this.subscription.add(
            this.deleted$.pipe(skip(1)).subscribe(deleted => {
                this.scrollViewport.checkViewportSize();
            })
        );
    }

    ngAfterViewInit() {
        // ViewChild (scrollViewport) is only available after view init
        this.subscription.add(this.messagesDataSource.dataStream.subscribe(data => {
            this.scrollViewport.checkViewportSize();
        }));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
