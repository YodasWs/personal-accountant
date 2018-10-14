'use strict';

window.myBooks = {
	transactions: [
		{
			description: 'Lowe\'s',
			category: 'Home Improvement',
			amount: -52.23,
			account: '0001',
			date: new Date(2017, 5, 20),
		},
		{
			description: 'Target',
			category: 'Groceries',
			amount: -30.02,
			account: '0001',
			date: new Date(2017, 5, 21),
		},
		{
			description: 'Pay',
			category: 'Pay',
			amount: 500,
			account: '0001',
			date: new Date(2017, 7, 28),
		},
		{
			description: 'Hulu',
			category: 'Entertainment',
			amount: -8.56,
			account: '0002',
			date: new Date(2017, 6, 1),
			monthly: true,
		},
		{
			description: 'Hulu',
			category: 'Entertainment',
			amount: -8.56,
			account: '0002',
			date: new Date(2017, 7, 1),
			monthly: true,
		},
		{
			description: 'Hulu',
			category: 'Entertainment',
			amount: -8.56,
			account: '0002',
			date: new Date(2017, 8, 1),
			monthly: true,
		},
		{
			description: 'Tuition',
			category: 'Education',
			amount: 5000,
			account: '0003',
			date: new Date(2017, 7, 21),
		},
		{
			description: 'Cinema Theatres',
			category: 'Entertainment',
			amount: -12.88,
			account: '0002',
			date: new Date(2017, 8, 4),
		},
		{
			description: 'Loan Payment',
			category: 'Transfer',
			amount: -100,
			account: '0001',
			date: new Date(2017, 8, 2),
		},
		{
			description: 'Loan Payment',
			category: 'Loan Payment',
			amount: -100,
			account: '0003',
			date: new Date(2017, 8, 2),
		},
	],
	accounts: [
		{
			id: '0001',
			name: 'Bill Pay',
			balance: 1200,
			type: 'checking',
			ela: 'asset',
		},
		{
			id: '0002',
			name: 'Everyday',
			balance: 808,
			type: 'checking',
			ela: 'asset',
		},
		{
			id: '0003',
			name: 'Student Loan',
			balance: 20000,
			type: 'loan',
			ela: 'liability',
		},
	],
}

angular.module('myBooks', [
	'compTransactionsTable',
	'pageEditTransaction',
	'pageMonthlyExpenses',
	'compEquityTable',
	'pageAccounts',
	'directives',
	'pageCalcs',
	'pageOrgs',
	'filters',
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
