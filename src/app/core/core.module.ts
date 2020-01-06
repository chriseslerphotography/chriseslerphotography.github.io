import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

import { AppShellComponent } from './components/app-shell/app-shell.component';
import { AppShellContentDirective } from './directives/app-shell-content.directive';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  declarations: [
    AppShellComponent,
    AppShellContentDirective
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    AppShellContentDirective,
    AppShellComponent
  ],
  providers: [
    // set in services themselves
  ],
  entryComponents: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
