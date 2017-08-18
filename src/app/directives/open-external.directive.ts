import { Directive, Input, HostListener } from '@angular/core';

import { shell } from 'electron'

@Directive({
  selector: '[appOpenExternal]'
})
export class OpenExternalDirective {

  constructor() {
  }

  @HostListener('click', ['$event'])
  confirmFirst(event: Event) {
    event.preventDefault();
    console.log(event)
  }
}
