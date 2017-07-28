'use strict';

window.myBooks = {
	transactions: [
		{
			description: 'Lowe\'s',
			category: 'Home Improvement',
			amount: 52.23,
			account: '0001',
			date: new Date(2017, 5, 20),
		},
		{
			description: 'Target',
			category: 'Groceries',
			amount: 30.02,
			account: '0001',
			date: new Date(2017, 5, 21),
		},
	]
}

angular.module('myBooks', [
	'compTransactionsTable',
	'pageEditTransaction',
	'compEquityTable',
	'pageAccounts',
	'ngRoute',
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.when('/', {
		templateUrl: 'pages/home.html',
	})
	.otherwise({redirectTo: '/'})
}])
.filter('strDate', () => {
	return function(date) {
		if (typeof date === 'string') {
			date = new Date(date)
		}
		return date.toLocaleString(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		})
	}
})
