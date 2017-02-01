'use strict';

/**
 * @memberof cmp2App
 * @ngdoc filter
 * @name truncate
 * @function
 * @description
 * # truncate
 * Filter in the cmp2App.
 */
angular.module('cmp2App').filter('truncate', function() {
  return function(input, chars) {
    if (isNaN(chars)) {
      return input;
    }
    if (chars <= 0) {
      return '';
    }
    if (input && input.length > chars) {
      var prefix = input.substring(0, chars / 2);
      var postfix = input.substring(input.length - chars / 2, input.length);
      return prefix + '...' + postfix;
    }
    return input;
  };
});
