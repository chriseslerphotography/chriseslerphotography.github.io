import {
    State,
    Action,
    Selector,
    StateContext,
    NgxsOnInit,
    NgxsAfterBootstrap
} from '@ngxs/store';

import { MessagesService } from '../services/messages.service';

import { map, catchError } from 'rxjs/operators';

/* Model interfaces */

export interface MessageModel {
    id: number;
    author: {
        name: string;
        photoUrl: string;
    };
    updated: string;
    content: string;
}

export interface MessagesStateModel {
    pageToken: string | null;
    loading: boolean;
    error: {};
    messages: MessageModel[];
}

/* action descriptors */

export class MSFetchMessages {
    public static type = '[Message State] Fetch Messagse';
    constructor (
        public readonly limit: number = 25,
        public readonly pageToken: any = false
    ) {}
}

export class MSFetchMessagesSuccess {
    public static type = '[Message State] Fetch Messages - SUCCESS';
    constructor (
        public readonly response: any
    ) {}
}

export class MSError {
    public static type = '[Message State] Error Happened';
    constructor (
        public readonly error: any,
        public readonly label: string = 'Generic Error'
    ) {}
}

/** STATE */

@State<MessagesStateModel>({
    name: 'Messages',
    defaults: {
        pageToken: null,
        loading: false,
        error: {},
        messages: []
    }
})
export class MessagesState {
    constructor (
        private messages$: MessagesService
    ) {}

    /** Selectors */

    @Selector()
    static getPageToken(state: MessagesStateModel) {
        return state.pageToken;
    }

    @Selector()
    static getLoading(state: MessagesStateModel) {
        return state.loading;
    }

    @Selector()
    static getError(state: MessagesStateModel) {
        return state.error;
    }

    @Selector()
    static getMessages(state: MessagesStateModel) {
        return state.messages;
    }

    /** actions */

    @Action(MSError)
    ms_error(ctx: StateContext<MessagesStateModel>, { error, label}: MSError) {
        console.error('STATE :: ' + label, error);
        ctx.dispatch({ error });
    }

    @Action(MSFetchMessages)
    fetchMessage(ctx: StateContext<MessagesStateModel>, { limit, pageToken }: MSFetchMessages) {
        console.group('%c' + MSFetchMessages.type, 'padding: 4px; color: white; background: magenta; font-weight: bold;');
        console.log({limit, pageToken});
        console.groupEnd();

        return this.messages$.getMessages(limit, pageToken).pipe(
            map ((payload: any) => {
                return ctx.dispatch(new MSFetchMessagesSuccess(payload));
            }),
            catchError (error => ctx.dispatch(new MSError(error, MSFetchMessages.type)))
        );
    }

    @Action(MSFetchMessagesSuccess)
    fetchMessage_success(ctx: StateContext<MessagesStateModel>, { response }: MSFetchMessagesSuccess) {
        console.group('%c' + MSFetchMessagesSuccess.type, 'padding: 4px; color: white; background: green; font-weight: bold;');
        console.log({response});
        console.groupEnd();

        if (response.messages.length > 0) {
            const state = ctx.getState();

            let messages = [...state.messages];
            messages = messages.concat(response.messages);

            ctx.patchState({
                messages,
                pageToken: response.pageToken
            });
        }
    }
}
