'use strict';

/**
 * @memberof cmp2App
 * @ngdoc directive
 * @name notes
 * @description
 * # notes
 */
angular.module('cmp2App').directive('notes', function() {
  return {
    templateUrl: 'views/account_notes.html',
    restrict: 'E',
    controller: 'AccountNotesCtrl',
    controllerAs: 'notes'
  };
});
