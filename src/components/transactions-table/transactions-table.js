'use strict';

angular.module('transactionsTable')
.component('transactionsTable', {
	templateUrl: 'components/transactions-table/transactions-table.html',
	controller() {
		this.transactions = myBooks.transactions
	}
})
