'use strict';

/**
 * @memberof cmp2App
 * @ngdoc directive
 * @name todoEscape
 * @description
 * # todoEscape
 */
angular.module('cmp2App').directive('todoEscape', function() {
  var ESCAPE_KEY = 27;

  return function(scope, elem, attrs) {
    elem.bind('keydown', function(event) {
      if (event.keyCode === ESCAPE_KEY) {
        scope.$apply(attrs.todoEscape);
      }
    });

    scope.$on('$destroy', function() {
      elem.unbind('keydown');
    });
  };
});
