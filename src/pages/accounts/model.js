'use strict';

angular.module('pageAccounts')
.controller('ctrlAccounts', ($scope) => {
	$scope.accounts = myBooks.accounts
	$scope.transactions = myBooks.transactions
})
