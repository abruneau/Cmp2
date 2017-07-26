import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';

import { TypeaheadMatch } from 'ngx-bootstrap';

import 'moment';
import 'jquery.nicescroll';
import 'bootstrap'
import * as moment from 'moment'
declare const $: any;

import { IdentityService } from '../../../models/identity.service';
import { Identity, Account } from '../../../models';
import { AccountService } from '../../../models/account.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, AfterViewInit {

  public identity = {};
  public accounts: Array<Account> = [];
  public selected: string;
  public search: '';

  clock = Observable
    .interval(1000)
    .map(() => new Date());

  constructor(private _identity: IdentityService, private _account: AccountService, private _router: Router) {
    _identity.ready.subscribe((ready: boolean) => {
      if (ready) {
        this.identity = _identity.identity;
      }
    })

    _account.List.subscribe((list) => {
      this.accounts = list;
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $.fn.ripple = function() {
      $(this).click(function(e) {
        const $rippler = $(this);
        $rippler.find('.ink').remove();

        const $ink = $('<span class=\'ink\'></span>');

        if ($rippler.children('a').first()) {
          $rippler.children('a').first().append($ink);
        } else {
          $rippler.append($ink);
        }

        $ink.removeClass('animate');
        if (!$ink.height() && !$ink.width()) {
          const d = Math.max($rippler.outerWidth(), $rippler.outerHeight());
          $ink.css({
            height: d,
            width: d
          });
        }

        const x = e.pageX - $rippler.offset().left - $ink.width() / 2;
        const y = e.pageY - $rippler.offset().top - $ink.height() / 2;
        $ink.css({
          top: y + 'px',
          left: x + 'px'
        }).addClass('animate');
      });
    };
    $('.box-v6-content-bg').each(function() {
      $(this).attr('style', 'width:' + $(this).attr('data-progress') + ';');
    });

    $('.carousel-thumb').on('slid.bs.carousel', function() {
      if ($(this).find($('.item')).is('.active')) {
        const Current = $(this).find($('.item.active')).attr('data-slide');
        $('.carousel-thumb-img li img').removeClass('animated rubberBand');
        $('.carousel-thumb-img li').removeClass('active');

        $($('.carousel-thumb-img').children()[Current]).addClass('active');
        $($('.carousel-thumb-img li').children()[Current]).addClass('animated rubberBand');
      }
    });



    $('.carousel-thumb-img li').on('click', function() {
      $('.carousel-thumb-img li img').removeClass('animated rubberBand');
      $('.carousel-thumb-img li').removeClass('active');
      $(this).addClass('active');
    });

    $('#mimin-mobile-menu-opener').on('click', function(e) {
      $('#mimin-mobile').toggleClass('reverse');
      const rippler = $('#mimin-mobile');
      if (!rippler.hasClass('reverse')) {
        if (rippler.find('.ink').length === 0) {
          rippler.append('<div class=\'ink\'></div>');
        }
        const ink = rippler.find('.ink');
        ink.removeClass('animate');
        if (!ink.height() && !ink.width()) {
          const d = Math.max(rippler.outerWidth(), rippler.outerHeight());
          ink.css({ height: d, width: d });

        }
        const x = e.pageX - rippler.offset().left - ink.width() / 2;
        const y = e.pageY - rippler.offset().top - ink.height() / 2;
        ink.css({
          top: y + 'px',
          left: x + 'px',
        }).addClass('animate');

        rippler.css({ 'z-index': 9999 });
        rippler.animate({
          backgroundColor: '#FF6656',
          width: '100%'
        }, 750);

        $('#mimin-mobile .ink').on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',
          function() {
            $('.sub-mimin-mobile-menu-list').show();
            $('#mimin-mobile-menu-opener span').removeClass('fa-bars').addClass('fa-close').css({ 'font-size': '2em' });
          });
      } else {

        if (rippler.find('.ink').length === 0) {
          rippler.append('<div class=\'ink\'></div>');
        }
        const ink = rippler.find('.ink');
        ink.removeClass('animate');
        if (!ink.height() && !ink.width()) {
          const d = Math.max(rippler.outerWidth(), rippler.outerHeight());
          ink.css({ height: d, width: d });

        }
        const x = e.pageX - rippler.offset().left - ink.width() / 2;
        const y = e.pageY - rippler.offset().top - ink.height() / 2;
        ink.css({
          top: y + 'px',
          left: x + 'px',
        }).addClass('animate');
        rippler.animate({
          backgroundColor: 'transparent',
          'z-index': '-1'
        }, 750);

        $('#mimin-mobile .ink').on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',
          function() {
            $('#mimin-mobile-menu-opener span').removeClass('fa-close').addClass('fa-bars').css({ 'font-size': '1em' });
            $('.sub-mimin-mobile-menu-list').hide();
          });
      }
    });



    $('.form-text').on('click', function() {
      $(this).before('<div class=\'ripple-form\'></div>');
      $('.ripple-form').on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',
        function(e) {
          // do something here
          $(this).remove();
        });
    });

    $('.mail-wrapper').find('.mail-left').css('height', $('.mail-wrapper').innerHeight());
    $('#left-menu ul li a').ripple();
    $('.ripple div').ripple();
    // $("#carousel-example3").carouselAnimate();
    $('#left-menu .sub-left-menu').niceScroll();
    $('.sub-mimin-mobile-menu-list').niceScroll({
      touchbehavior: true,
      cursorcolor: '#FF00FF',
      cursoropacitymax: 0.6,
      cursorwidth: 24,
      usetransition: true,
      hwacceleration: true,
      autohidemode: 'hidden'
    });

    $('.fileupload-v1-btn').on('click', function() {
      const wrapper = $(this).parent('span').parent('div');
      const path = wrapper.find($('.fileupload-v1-path'));
      $('.fileupload-v1-file').click();
      $('.fileupload-v1-file').on('change', function() {
        path.attr('placeholder', $(this).val());
        console.log(wrapper);
        console.log(path);
      });
    });

    this.leftMenu();
    this.rightMenu();
    this.treeMenu();
    this.hide();
  }

  private hide = function() {
    $('.tree').hide();
    $('.sub-tree').hide();
  };

  private treeMenu = function() {

    $('.tree-toggle').click(function(e) {
      e.preventDefault();
      const $this = $(this).parent().children('ul.tree');
      $('.tree').not($this).slideUp(600);
      $this.toggle(700);

      $('.tree').not($this).parent('li').find('.tree-toggle .right-arrow').removeClass('fa-angle-down').addClass('fa-angle-right');
      $this.parent('li').find('.tree-toggle .right-arrow').toggleClass('fa-angle-right fa-angle-down');
    });

    $('.sub-tree-toggle').click(function(e) {
      e.preventDefault();
      const $this = $(this).parent().children('ul.sub-tree');
      $('.sub-tree').not($this).slideUp(600);
      $this.toggle(700);

      $('.sub-tree').not($this).parent('li').find('.sub-tree-toggle .right-arrow').removeClass('fa-angle-down').addClass('fa-angle-right');
      $this.parent('li').find('.sub-tree-toggle .right-arrow').toggleClass('fa-angle-right fa-angle-down');
    });
  };

  private leftMenu = function() {

    $('.opener-left-menu').on('click', function() {
      $('.line-chart').width('100%');
      $('.mejs-video').height('auto').width('100%');
      if ($('#right-menu').is(':visible')) {
        $('#right-menu').animate({ 'width': '0px' }, 'slow', function() {
          $('#right-menu').hide();
        });
      }
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
    });
  };

  private userList = function() {

    $('.user-list ul').niceScroll({
      touchbehavior: true,
      cursorcolor: '#FF00FF',
      cursoropacitymax: 0.6,
      cursorwidth: 24,
      usetransition: true,
      hwacceleration: true,
      autohidemode: 'hidden'
    });

  };

  private rightMenu = function() {
    $('.opener-right-menu').on('click', function() {
      this.userList();
      $('.user').niceScroll();
      $('.user ul li').on('click', function() {
        $('.user-list ul').getNiceScroll().remove();
        $('.user').hide();
        $('.chatbox').show(1000);
        this.userList();
      });

      $('.close-chat').on('click', function() {
        $('.user').show();
        $('.chatbox').hide(1000);
      });

      $('.line-chart').width('100%');

      if ($('#left-menu .sub-left-menu').is(':visible')) {
        $('#left-menu .sub-left-menu').animate({ 'width': '0px' }, 'slow', function() {
          $('#left-menu .sub-left-menu').hide();
          $('.overlay').show();
          $('.opener-left-menu').removeClass('is-open');
          $('.opener-left-menu').addClass('is-closed');
        });

        $('#content').animate({ 'padding-left': '0px' }, 'slow');
      }

      if ($('#right-menu').is(':visible')) {
        $('#right-menu').animate({ 'width': '0px' }, 'slow', function() {
          $('#right-menu').hide();
        });
        $('#content').animate({ 'padding-right': '0px' }, 'slow');
      } else {
        $('#right-menu').show();
        $('#right-menu').animate({ 'width': '230px' }, 'slow');
        $('#content').animate({ 'padding-right': '230px' }, 'slow');
      }
    });
  };

  public typeaheadOnSelect(e: TypeaheadMatch): void {
    const route = '/account/' + e.item.Id;
    this._router.navigate([route]);
  }

}
