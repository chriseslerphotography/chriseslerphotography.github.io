import { keyframes, style } from '@angular/animations';

/**
 * PREDEFINED KEYFRAMES
 *
 * Inspired by:
 * https://github.com/AngularFirebase/78-hammerjs-angular-animations/blob/master/src/app/hammer-card/keyframes.ts
 *
 * Made modifications to be an object
 * Based on styles generated at:
 * https://animista.net/
 *
 */

/** EXIT ANIMATIONS */

export const slideOutEllipticLeftBack: any = {
    timings: '700ms ease-in',
    styles: [
        style({
            transform: 'translateX(0) rotateY(0) scale(1)',
            transformOrigin: '2000px 50%',
            opacity: 1,
            offset: 0
        }),
        style({
            transform: 'translateX(-1000px) rotateY(30deg) scale(0)',
            transformOrigin: '-100% 50%',
            opacity: 1,
            offset: 1
        })
    ]
};

export const slideOutEllipticRightBack: any = {
    timings: '700ms ease-in',
    styles: [
        style({
            transform: 'translateX(0) rotateY(0) scale(1)',
            transformOrigin: '-1800px 50%',
            opacity: 1,
            offset: 0
        }),
        style({
            transform: 'translateX(1000px) rotateY(-30deg) scale(0)',
            transformOrigin: '-100% 50%',
            opacity: 1,
            offset: 1
        })
    ]
};

export const slideOutLeft: any = {
    timings: '500ms cubic-bezier(0.550, 0.085, 0.680, 0.530)',
    styles: [
        style({ transform: 'translateX(0)', opacity: 1, offset: 0 }),
        style({ transform: 'translateX(-1000px)', opacity: 0, offset: 1 })
    ]
};

export const slideOutRight: any = {
    timings: '500ms cubic-bezier(0.550, 0.085, 0.680, 0.530)',
    styles: [
        style({ transform: 'translateX(0)', opacity: 1, offset: 0 }),
        style({ transform: 'translateX(1000px)', opacity: 0, offset: 1 })
    ]
};

export const slideOutBlurredLeft: any = {
    timings: '450ms cubic-bezier(0.755, 0.050, 0.855, 0.060)',
    styles: [
        style({
            transform: 'translateX(0) scaleY(1) scaleX(1)',
            'transform-origin': '50%, 50%',
            filter: 'blur(0)',
            opacity: 1,
            offset: 0
        }),
        style({
            transform: 'translateX(-1000px) scaleX(2) scaleY(0.2)',
            'transform-origin': '100%, 50%',
            filter: 'blur(40px)',
            opacity: 0,
            offset: 1
        })
    ]
};

export const slideOutBlurredRight: any = {
    timings: '450ms cubic-bezier(0.755, 0.050, 0.855, 0.060)',
    styles: [
        style({
            transform: 'translateX(0) scaleY(1) scaleX(1)',
            'transform-origin': '50%, 50%',
            filter: 'blur(0)',
            opacity: 1,
            offset: 0
        }),
        style({
            transform: 'translateX(1000px) scaleX(2) scaleY(0.2)',
            'transform-origin': '0%, 50%',
            filter: 'blur(40px)',
            opacity: 0,
            offset: 1
        })
    ]
};
