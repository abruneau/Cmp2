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

  /* global $ */
  // Docs at http://simpleweatherjs.com

  $scope.weather = null;

  function loadWeather(location, woeid) {
    $.simpleWeather({
      location: location,
      woeid: woeid,
      unit: 'c',
      success: function(weather) {
        $scope.$apply(function() {
          $scope.weather = weather;
        });
      },
      error: function(error) {
        $("#weather").html('<p>' + error + '</p>');
      }
    });
  }

  var whereAmI = require('@rainder/where-am-i');

  $(document).ready(function() {
    whereAmI.getLocation().then(function(location) {
      loadWeather(location.point.latitude + ',' + location.point.longitude);
    });
  });

  function loadForcast() {
    salesForce.loadForcastBoard().then(function(res) {
      if (res) {
        $scope.$apply(function() {
          $scope.forcastBoard = res.records[0];
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
