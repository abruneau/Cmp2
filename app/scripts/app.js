'use strict';

/**
 * @ngdoc overview
 * @name cmp2App
 * @description
 * # cmp2App
 *
 * Main module of the application.
 */
angular
  .module('cmp2App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/account/:id', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        controllerAs: 'Account'
      })
      .when('/account_form', {
        templateUrl: 'views/account_form.html',
        controller: 'AccountFormCtrl',
        controllerAs: 'accountForm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
