import { Directive, Input, HostListener } from '@angular/core';

import { shell } from 'electron'

@Directive({
  selector: '[appOpenExternal]'
})
export class OpenExternalDirective {

  @Input('appOpenExternal') url: string

  constructor() {
  }

  @HostListener('click', ['$event'])
  confirmFirst(event: Event) {
    shell.openExternal(this.url)
  }
}
