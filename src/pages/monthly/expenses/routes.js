'use strict';

angular.module('pageMonthlyExpenses')
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$routeProvider.when('/monthly/expenses/', {
		templateUrl: 'pages/monthly/expenses/monthly-expenses.html',
		controller: 'ctrlExpenses',
		controllerAs: '$ctrl',
	})
}])
