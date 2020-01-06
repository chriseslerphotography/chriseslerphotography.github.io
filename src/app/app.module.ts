import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';

// custom modules
import { CoreModule } from './core/core.module';

// routing
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';

// store
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
// import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
// import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

// services
import { TitleService } from './core/services/title.service';

import { AppState } from './shared/store/app.state';

import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

export class MyHammerConfig extends HammerGestureConfig {
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    overrides = <any>{
        // override hammerjs default configuration
        swipe: { direction: Hammer.DIRECTION_HORIZONTAL },
        pinch: { enable: false },
        rotate: { enable: false },
        pan: { enable: false }
    };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    AppRoutingModule,
    NgxsModule.forRoot([AppState], { developmentMode: !environment.production }),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [
    TitleService,
    {
        provide: HAMMER_GESTURE_CONFIG,
        useClass: MyHammerConfig
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(titleService: TitleService) {
    titleService.init();
  }
}
