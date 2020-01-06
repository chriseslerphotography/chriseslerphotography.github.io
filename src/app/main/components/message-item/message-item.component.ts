import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from "@angular/core";
import { MessageModel } from '../../store/messages.state';

import { environment } from '../../../../environments/environment';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
    selector: "message-item",
    templateUrl: "./message-item.component.html",
    styleUrls: ["./message-item.component.scss"]
})
export class MessageItemComponent implements OnInit {

    @HostBinding('class.message-item') _hostClass = true;

    @Input('message-item') msg: MessageModel | null = null;

    @Output() messageEvent = new EventEmitter<any>();

    // sanitized style url
    private urlCleaned: SafeStyle | boolean = false;

    // get sanitzed image url
    get authorImage(): SafeStyle {

        if (!this.urlCleaned) {
            const imgUrl = environment.messageImageUrl + this.msg.author.photoUrl;
            this.urlCleaned = this.sanitizer.bypassSecurityTrustStyle(`url(${imgUrl})`);
        }

        return this.urlCleaned;
    }

    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit() {}
}
