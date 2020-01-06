// Mixup from information gathered from:
//   https://toddmotto.com/dynamic-page-titles-angular-2-router-events
//   https://stackoverflow.com/questions/34597835/how-to-get-current-route
//   https://medium.com/@p.gvlas/dynamic-page-titles-in-angular-518a2b8d03d2
//
import { Injectable } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const APP_TITLE = environment.baseTitle || 'SITE TITLE';
const SEPARATOR = ' > ';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  static ucFirst(val: string) {
    if (!val) { return val; }
    return val.charAt(0).toUpperCase() + val.slice(1);
}

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) { }

  init() {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
            while (route.firstChild) {
                route = route.firstChild;
            }
            return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
        map((data) => {
            if (data.title) {
                // If a route has a title set (e.g. data: {title: "Foo"}) then we use it
                return data.title;
            } else {
                // If not, we do a little magic on the url to create an approximation
                return this.router.url.split('/').reduce((acc, frag) => {
                    if (acc && frag) { acc += SEPARATOR; }
                    return this.router.url.split('/').reduce((acc2, frag2) => {
                        if (acc2 && frag2) { acc2 += SEPARATOR; }
                        return acc2 + TitleService.ucFirst(frag2);
                    });
                });
            }
        })
    ).subscribe((pageTitle) => {
        this.titleService.setTitle(`${APP_TITLE} ${pageTitle}`);
    });
}
}
