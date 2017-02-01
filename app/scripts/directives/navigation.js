'use strict';

/**
 * @memberof cmp2App
 * @ngdoc directive
 * @name navigation
 * @description
 * # navigation
 */
angular.module('cmp2App')
  .directive('navigation', function() {
    return {
      templateUrl: 'views/navigation.html',
      restrict: 'E',
      controller: 'NavigationCtrl',
      controllerAs: 'navigation'
    };
  });
