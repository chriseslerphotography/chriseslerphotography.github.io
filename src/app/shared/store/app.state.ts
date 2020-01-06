import { State, Selector, StateContext } from '@ngxs/store';

export class GetAppName {
    static readonly type = '[Version] Set version';
    constructor(public version: string) {}
  }

@State<string | null>({
    name: 'app',
    defaults: 'google-project'
  })
  export class AppState {
    constructor() {}


    @Selector()
    static getApp(state: string | null) {
        return state;
    }

  }
