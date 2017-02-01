'use strict';

/**
 * @ngdoc function
 * @name cmp2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the cmp2App
 */
angular.module('cmp2App').controller('AccountCtrl', function($scope, $routeParams, Accounts, salesForce, localAccount) {
  var accountId = $routeParams.id;
  var remote = require('electron').remote;
  var dialog = remote.dialog; // Load the dialogs component of the OS

  $scope.loadingAccount = true;
  $scope.sf = salesForce.settings;

  Array.prototype.sum = function(prop, filter, value) {
    var total = 0;
    for (var i = 0, _len = this.length; i < _len; i++) {
      if (this[i][filter] === value) {
        total += this[i][prop];
      }
    }
    return total;
  };

  /**
   * Observer Callback for Accounts service
   * @memberof AccountCtrl
   * @function updateAccounts
   */
  var updateAccounts = function() {
    $scope.account = Accounts.selected;
    $scope.opportunities = Accounts.opportunities;
    $scope.forcast = $scope.opportunities.sum("Amount", "IsClosed", false);
    $scope.closed = $scope.opportunities.sum("Amount", "IsWon", true);
    $scope.refreching = false;
    if ($scope.account) {
      $scope.loadingAccount = false;
    }
  };


  /**
   * Observer Callback for local infos
   * @memberof AccountCtrl
   * @function updateLocalInfo
   */
  var updateLocalInfo = function() {
    $scope.localInfo = localAccount.selected;
  };

  var updateSf = function() {
    $scope.$apply(function() {
      $scope.sf = salesForce.settings;
    });
  };

  $scope.localInfo = {
    path: '',
    attributes: {
      type: 'LocalInfo'
    },
    accountId: accountId
  };

  $scope.showClosedOpport = false;
  $scope.sortReverse = true; // set the default sort order
  $scope.sortType = 'CreatedDate'; // set the default sort type
  $scope.search = ''; // set the default search/filter term
  $scope.active = 0;
  $scope.refreching = false;

  /**
   * Open Dialog to select local directory for the account
   * @memberof AccountCtrl
   * @function selectDirectory
   */
  $scope.selectDirectory = function() {
    dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory']
    }, function(path) {
      $scope.$apply(function() {
        $scope.localInfo.path = path[0];
      });
    });
  };

  /**
   * Update opportunities for an account
   * @memberof AccountCtrl
   * @function updateOpportunities
   */
  $scope.updateOpportunities = function() {
    $scope.refreching = true;
    salesForce.loadOpportunities($scope.account.Id);
  };

  /**
   * Update local infos
   * @memberof AccountCtrl
   * @function updateLocalInfo
   */
  $scope.updateLocalInfo = function() {

    if ($scope.localInfo._id) {
      localAccount.update($scope.localInfo);
    } else {
      $scope.localInfo.accountId = $scope.account.Id;
      localAccount.insert($scope.localInfo);
    }
  };

  $scope.updateAccountInfo = function() {
    salesForce.loadAccount($scope.account.Id);
    $scope.loadingAccount = true;
  };

  Accounts.registerObserverCallback(updateAccounts);
  localAccount.registerObserverCallback(updateLocalInfo);
  salesForce.registerObserverCallback(updateSf);
  Accounts.get(accountId);
  localAccount.get(accountId);
});
