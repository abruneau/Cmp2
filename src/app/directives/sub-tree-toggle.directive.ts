import { Directive, HostListener } from '@angular/core';

declare const $: any;
import 'jquery.nicescroll';

@Directive({
  selector: '[appSubTreeToggle]'
})
export class SubTreeToggleDirective {

  constructor() {
  }

  @HostListener('click', ['$event'])
  subTreeToggle($event: Event) {
    const $this = $($event.target).parent().children('ul.sub-tree');
    $('.sub-tree').not($this).slideUp(600);
    $this.toggle(700);

    $('.sub-tree').not($this).parent('li').find('.sub-tree-toggle .right-arrow').removeClass('fa-angle-down').addClass('fa-angle-right');
    $this.parent('li').find('.sub-tree-toggle .right-arrow').toggleClass('fa-angle-right fa-angle-down');
  }

}
