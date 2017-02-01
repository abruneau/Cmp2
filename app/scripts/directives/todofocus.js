'use strict';

/**
 * @memberof cmp2App
 * @ngdoc directive
 * @name todoFocus
 * @description
 * # todoFocus
 */
angular.module('cmp2App').directive('todoFocus', function($timeout) {
  return function(scope, elem, attrs) {
    scope.$watch(attrs.todoFocus, function(newVal) {
      if (newVal) {
        $timeout(function() {
          elem[0].focus();
        }, 0, false);
      }
    });
  };
});
