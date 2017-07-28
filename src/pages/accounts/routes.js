'use strict';

angular.module('pageAccounts')
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$routeProvider.when('/account/:id', {
		templateUrl: 'pages/accounts/account.html',
	})
	$routeProvider.when('/accounts', {
		templateUrl: 'pages/accounts/accounts.html',
		controller: 'ctrlAccounts',
		controllerAs: '$ctrl',
	})
}])
