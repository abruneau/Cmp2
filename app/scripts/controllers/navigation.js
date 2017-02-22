'use strict';

/**
 * @memberof cmp2App
 * @ngdoc controller
 * @name NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the cmp2App
 */
angular.module('cmp2App').controller('NavigationCtrl', function($scope, salesForce, Accounts, localAccount) {

  /* global moment */
  /* global $ */

  $scope.datetime = null;
  $scope.datetime2 = null;

  var update = function() {
    var date = moment(new Date());
    if (!$scope.$$phase) {
      $scope.$apply(function() {
        $scope.datetime = date.format('HH:mm');
        $scope.datetime2 = date.format('dddd, MMMM Do YYYY');
      });
    } else {
      $scope.datetime = date.format('HH:mm');
      $scope.datetime2 = date.format('dddd, MMMM Do YYYY');
    }
  };

  var hide = function() {
    $(".tree").hide();
    $(".sub-tree").hide();
  };

  $scope.openLeftMenu = function() {
    $(".line-chart").width("100%");
    $(".mejs-video").height("auto").width("100%");
    if ($('#right-menu').is(":visible")) {
      $('#right-menu').animate({
        'width': '0px'
      }, 'slow', function() {
        $('#right-menu').hide();
      });
    }
    if ($('#left-menu .sub-left-menu').is(':visible')) {
      $('#content').animate({
        'padding-left': '0px'
      }, 'slow');
      $('#left-menu .sub-left-menu').animate({
        'width': '0px'
      }, 'slow', function() {
        $('.overlay').show();
        $('.opener-left-menu').removeClass('is-open');
        $('.opener-left-menu').addClass('is-closed');
        $('#left-menu .sub-left-menu').hide();
      });

    } else {
      $('#left-menu .sub-left-menu').show();
      $('#left-menu .sub-left-menu').animate({
        'width': '230px'
      }, 'slow');
      $('#content').animate({
        'padding-left': '230px',
        'padding-right': '0px'
      }, 'slow');
      $('.overlay').hide();
      $('.opener-left-menu').removeClass('is-closed');
      $('.opener-left-menu').addClass('is-open');
    }
  };

  $scope.treeToggle = function($event) {
    // $event.preventDefault();
    var $this = $($event.target).parent().children('ul.tree');
    $(".tree").not($this).slideUp(600);
    $this.toggle(700);

    $(".tree").not($this).parent("li").find(".tree-toggle .right-arrow").removeClass("fa-angle-down").addClass("fa-angle-right");
    $this.parent("li").find(".tree-toggle .right-arrow").toggleClass("fa-angle-right fa-angle-down");
  };

  $scope.subTreeToggle = function($event) {
    $event.preventDefault();
    var $this = $($event.target).parent().children('ul.sub-tree');
    $(".sub-tree").not($this).slideUp(600);
    $this.toggle(700);

    $(".sub-tree").not($this).parent("li").find(".sub-tree-toggle .right-arrow").removeClass("fa-angle-down").addClass("fa-angle-right");
    $this.parent("li").find(".sub-tree-toggle .right-arrow").toggleClass("fa-angle-right fa-angle-down");
  };

  $("#left-menu .sub-left-menu").niceScroll();

  update();
  hide();
  setInterval(update, 1000);

  var updateSf = function() {
    $scope.identity = salesForce.identity;
  };

  var updateAccounts = function() {
    if (localAccount.list && Accounts.list) {

      var idList = localAccount.list.filter(function(e) {
        return e.stared;
      }).map(function(e) {
        return e.accountId;
      });

      $scope.stared = Accounts.list.filter(function(e) {
        return this.indexOf(e.Id) >= 0;
      }, idList);

      $scope.unstared = Accounts.list.filter(function(e) {
        return this.indexOf(e.Id) < 0;
      }, idList);
    }
  };

  var updateLocalInfo = function() {
    updateAccounts();
  };

  $scope.isStared = function(account) {
    var filtre = $scope.localAccountList.filter(function(element) {
      return element.accountId === account.Id;
    });

    if (filtre) {
      return filtre[0].stared;
    }

    return false;

  };

  salesForce.registerObserverCallback(updateSf);
  Accounts.registerObserverCallback(updateAccounts);
  localAccount.registerObserverCallback(updateLocalInfo);

  Accounts.updateList();
  localAccount.updateList();

});
