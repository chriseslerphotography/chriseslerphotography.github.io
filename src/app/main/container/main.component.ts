import { Component, OnInit, HostBinding, OnDestroy } from "@angular/core";
import { Select, Selector, Store } from '@ngxs/store';

import {
    MessagesState,
    MessageModel,
    MSFetchMessages
} from '../store/messages.state';
import { Observable, Subscription } from 'rxjs';

import { MessagesDataSource } from './messages.datasource';

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit, OnDestroy {
    @HostBinding("class.app-main") _hostClass = true;

    @Select(MessagesState.getError) error$: Observable<any>;
    error: any = {};

    private subscription: Subscription = new Subscription();

    messagesDataSource: MessagesDataSource;

    constructor(
        private store: Store
    ) {
        // initialize custom datasource, passing in NGXS store
        this.messagesDataSource = new MessagesDataSource(store);
    }

    ngOnInit() {
        this.subscription.add(this.error$.subscribe(error => {
            this.error = error;
        }));
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
