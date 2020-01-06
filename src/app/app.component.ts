import { Component, HostBinding } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AppState } from './shared/store/app.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @HostBinding('class.app-root') _hostClass = true;

    @Select(AppState.getApp) app$: Observable<any>;

    public constructor() {}
}
