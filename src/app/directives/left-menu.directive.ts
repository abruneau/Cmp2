import { Directive, Input, HostListener, ElementRef } from '@angular/core';

declare const $: any;
import 'jquery.nicescroll';

@Directive({
  selector: '[appLeftMenu]'
})
export class LeftMenuDirective {

  constructor(private el: ElementRef) { }

  @HostListener('click')
  onclick() {
    $('.line-chart').width('100%');
    if ($('#left-menu .sub-left-menu').is(':visible')) {
      $('#content').animate({ 'padding-left': '0px' }, 'slow');
      $('#left-menu .sub-left-menu').animate({ 'width': '0px' }, 'slow', function() {
        $('.overlay').show();
        $('.opener-left-menu').removeClass('is-open');
        $('.opener-left-menu').addClass('is-closed');
        $('#left-menu .sub-left-menu').hide();
      });

    } else {
      $('#left-menu .sub-left-menu').show();
      $('#left-menu .sub-left-menu').animate({ 'width': '230px' }, 'slow');
      $('#content').animate({ 'padding-left': '230px', 'padding-right': '0px' }, 'slow');
      $('.overlay').hide();
      $('.opener-left-menu').removeClass('is-closed');
      $('.opener-left-menu').addClass('is-open');
    }
  }

}
