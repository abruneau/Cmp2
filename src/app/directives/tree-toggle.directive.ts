import { Directive, HostListener } from '@angular/core';

declare const $: any;
import 'jquery.nicescroll';

@Directive({
  selector: '[appTreeToggle]'
})
export class TreeToggleDirective {

  constructor() {
    $('#left-menu .sub-left-menu').niceScroll();
  }

  @HostListener('click', ['$event'])
  treeToggle($event: Event) {
    const $this = $($event.target).parent().children('ul.tree');
    $('.tree').not($this).slideUp(600);
    $this.toggle(700);

    $('.tree').not($this).parent('li').find('.tree-toggle .right-arrow').removeClass('fa-angle-down').addClass('fa-angle-right');
    $this.parent('li').find('.tree-toggle .right-arrow').toggleClass('fa-angle-right fa-angle-down');
    $('.nav-list').trigger('resize');
  }

}
