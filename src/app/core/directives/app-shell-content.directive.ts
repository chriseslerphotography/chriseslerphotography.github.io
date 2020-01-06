import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appShellContent]'
})
export class AppShellContentDirective {

  constructor(
    public tpl: TemplateRef<any>
  ) { }

}
