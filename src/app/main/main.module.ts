import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MainRoutingModule } from "./main-routing.module";

import { MainComponent } from "./container/main.component";

import { NgxsModule } from '@ngxs/store';

import { MessagesState } from './store/messages.state';

import { MaterialModule } from '../core/material.module';
import { MessageItemComponent } from './components/message-item/message-item.component';

import { SwingModule } from 'angular2-swing';

@NgModule({
    declarations: [
        MainComponent,
        MessageItemComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        MaterialModule,
        SwingModule,
        NgxsModule.forFeature([
            MessagesState
        ])
    ]
})
export class MainModule {}
