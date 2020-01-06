import {
    Component,
    OnInit,
    HostBinding,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    Renderer2
} from '@angular/core';

import { MessageModel } from '../../store/messages.state';

import { environment } from '../../../../environments/environment';

import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from '../../../shared/animations/keyframes';


@Component({
    // tslint:disable-next-line: component-selector
    selector: 'message-item',
    templateUrl: './message-item.component.html',
    styleUrls: ['./message-item.component.scss'],
    animations: [
        trigger('cardAnimator', [
            //transition('* => slideOutLeft', animate(750, keyframes(kf.slideOutLeft))),
            //transition('* => slideOutRight', animate(750, keyframes(kf.slideOutRight)))
            transition(
                '* => ellipticLeftBack',
                animate(
                    kf.slideOutEllipticLeftBack.timings,
                    keyframes(kf.slideOutEllipticLeftBack.styles)
                )
            ),
          transition(
              '* => ellipticRightBack',
              animate(
                  kf.slideOutEllipticRightBack.timings,
                  keyframes(kf.slideOutEllipticRightBack.styles)
                )
            ),
          transition(
              '* => blurredLeft',
              animate(
                  kf.slideOutBlurredLeft.timings,
                  keyframes(kf.slideOutBlurredLeft.styles)
                )
            ),
          transition(
              '* => blurredRight',
              animate(
                  kf.slideOutBlurredRight.timings,
                  keyframes(kf.slideOutBlurredRight.styles)
                )
            )
        ])
      ]
})
export class MessageItemComponent implements OnInit {
    @HostBinding('class.message-item') _hostClass = true;

    @Input('message-item') msg: MessageModel | null = null;

    @Output() messageEvent = new EventEmitter<any>();

    animationState: string | boolean = false;

    // sanitized style url
    private urlCleaned: SafeStyle | boolean = false;

    // get sanitzed image url
    get authorImage(): SafeStyle {
        if (!this.urlCleaned) {
            const imgUrl =
                environment.messageImageUrl + this.msg.author.photoUrl;
            this.urlCleaned = this.sanitizer.bypassSecurityTrustStyle(
                `url(${imgUrl})`
            );
        }

        return this.urlCleaned;
    }

    startAnimation(state) {
        // console.log('startAnimation', state);
        if (!this.animationState) {
            this.animationState = state;
        }
    }

    resetAnimationState() {
        this.animationState = '';
    }

    animationDone() {
        // console.log('AnimationDone', this.animationState);
        if (this.animationState) {
            this.renderer.addClass(this.hostEl.nativeElement, 'hidden');
        }
        this.messageEvent.emit({
            animationDone: this.animationState,
            message: this.msg
        });
    }

    constructor(private sanitizer: DomSanitizer, private hostEl: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {}
}
