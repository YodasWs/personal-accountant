'use strict';

angular.module('compEquityTable')
.component('equityTable', {
	templateUrl: 'components/equity-table/equity-table.html',
	controller() {
		this.transactions = myBooks.transactions
	}
})
