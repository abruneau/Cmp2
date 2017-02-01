'use strict';

/**
 * @ngdoc function
 * @name cmp2App.controller:AccountFormCtrl
 * @description
 * # AccountFormCtrl
 * Controller of the cmp2App
 */
angular.module('cmp2App').controller('AccountFormCtrl', function(salesForce, $scope, $window) {

	$scope.searching = false;

	/**
	 * Search SalesForce account from key words
	 * @memberof AccountFormCtrl
	 * @function searchAccount
	 * @param  {String} search Account to search for
	 */
	$scope.searchAccount = function (search) {
		$scope.searching = true;
		salesForce.findAccountByName(search).then(function (res) {
			$scope.options = res.records;
			$scope.searching = false;
		});
	};


	/**
	 * Load data of a SalesForce account
	 * @memberof AccountFormCtrl
	 * @function loadAccount
	 * @param  {String} id SalesForce account Id
	 */
	$scope.loadAccount = function (id) {
		salesForce.loadAccount(id).then(function () {
			$window.location.href = '#/account/' + id;
		});
	};
});
