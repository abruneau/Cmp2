'use strict';

/**
 * @memberof cmp2App
 * @ngdoc controller
 * @name MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cmp2App
 */
angular.module('cmp2App').controller('MainCtrl', function(salesForce, $scope) {


  function loadForcast() {
    salesForce.loadForcastBoard().then(function(res) {
      if (res) {
        $scope.$apply(function() {
          $scope.forcastBoard = res.records[0];
          console.log($scope.forcastBoard);
        });
      }
    });
  }


  var updateSf = function() {
    loadForcast();
  };

  loadForcast();
  salesForce.registerObserverCallback(updateSf);
});
