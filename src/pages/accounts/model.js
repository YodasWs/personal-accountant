'use strict';

angular.module('pageAccounts')
.controller('ctrlAccounts', ($scope) => {
	$scope.accounts = [
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
	]
})
