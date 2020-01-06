import {
    Component,
    OnInit,
    ContentChild,
    ViewChild,
    ElementRef
} from '@angular/core';

import { AppShellContentDirective } from '../../directives/app-shell-content.directive';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  host: {
      'class': 'app-shell'
  }
})
export class AppShellComponent implements OnInit {


    @ContentChild(AppShellContentDirective, {read: AppShellContentDirective, static: true}) shellContent: AppShellContentDirective;
    @ViewChild('shellContentOutlet', {read: ElementRef, static: true}) shellContentOutlet: ElementRef;
  constructor() { }

  ngOnInit() {
  }

}
