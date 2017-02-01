'use strict';

/**
 * @memberof cmp2App
 * @ngdoc directive
 * @name openExternal
 * @description
 * # openExternal
 */
angular.module('cmp2App').directive('openExternal', function() {
  return {
    restrict: 'C',
    link: function(scope, element) {
      const shell = require('electron').shell;
      element.on('click', function(event) {
        event.preventDefault();
        shell.openExternal(event.target.href);
      });
    }
  };
});
