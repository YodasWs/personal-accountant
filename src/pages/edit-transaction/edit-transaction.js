'use strict';

angular.module('editTransaction')
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$routeProvider.when('/edit-transaction/:id', {
		templateUrl: 'pages/edit-transaction/edit-transaction.html',
	})
	.when('/add-transaction/', {
		templateUrl: 'pages/edit-transaction/edit-transaction.html',
	})
}])
