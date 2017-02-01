'use strict';

/**
 * @memberof cmp2App
 * @ngdoc directive
 * @name files
 * @description
 * # files
 */
angular.module('cmp2App')
  .directive('files', function() {
    return {
      templateUrl: 'views/account_files.html',
      restrict: 'E',
      controller: 'AccountFilesCtrl',
      controllerAs: 'files'
    };
  });
