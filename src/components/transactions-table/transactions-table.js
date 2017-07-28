'use strict';

angular.module('compTransactionsTable')
.component('transactionsTable', {
	templateUrl: 'components/transactions-table/transactions-table.html',
	controller() {
		this.transactions = myBooks.transactions
	}
})
