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
		{
			description: 'Hulu',
			category: 'Entertainment',
			amount: 8.56,
			account: '0002',
			date: new Date(2017, 8, 1),
			monthly: true,
		},
	],
	accounts: [
		{
			id: '0001',
			name: 'Bill Pay',
			balance: 1200,
		},
		{
			id: '0002',
			name: 'Everyday',
			balance: 808,
		},
	],
}

angular.module('myBooks', [
	'compTransactionsTable',
	'pageEditTransaction',
	'pageMonthlyExpenses',
	'compEquityTable',
	'pageAccounts',
	'pageCalcs',
	'pageOrgs',
	'ngRoute',
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.when('/', {
		templateUrl: 'pages/home.html',
		controllerAs: '$ctrl',
		controller() {
			this.transactions = myBooks.transactions
		},
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
