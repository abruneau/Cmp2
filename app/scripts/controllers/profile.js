'use strict';

/**
 * @ngdoc function
 * @name cmp2App.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the cmp2App
 */
angular.module('cmp2App').controller('ProfileCtrl', function(salesForce, $scope) {

  $scope.sf = salesForce.settings;
  $scope.connected = salesForce.connected;
  $scope.identity = salesForce.identity;

  var updateSf = function() {
    $scope.$apply(function() {
      $scope.sf = salesForce.settings;
      $scope.connected = salesForce.connected;
      $scope.identity = salesForce.identity;
    });
  };

  //
  $scope.saveSf = function(set) {
    salesForce.update(set);
  };

  $scope.updateIdentity = function() {
    salesForce.updateIndentity();
  };

  salesForce.registerObserverCallback(updateSf);
});
