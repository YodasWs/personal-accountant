'use strict';

angular.module('compEquityTable')
.component('equityTable', {
	templateUrl: 'components/equity-table/equity-table.html',
	controller() {
		this.accounts = myBooks.accounts
	},
	bindings: {
		'transactions': '=',
		'filter': '=',
	},
})
