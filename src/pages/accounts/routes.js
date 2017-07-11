'use strict';

angular.module('pageAccounts')
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$routeProvider.when('/account/:id', {
		templateUrl: 'pages/accounts/accounts.html',
	})
	$routeProvider.when('/accounts', {
		templateUrl: 'pages/accounts/accounts.html',
	})
}])
