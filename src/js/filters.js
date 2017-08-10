'use strict';

angular.module('filters', [
])
.filter('strDate', () => {
	return (date) => {
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
.filter('strAccounting', () => {
	return (amt) => {
		if (typeof amt === 'object' && typeof amt.amount === 'number') {
			amt = amt.amount
		}
		if (typeof amt === 'string') {
			amt = Number.parseInt(amt, 10)
		}
		if (Number.isNaN(amt) || typeof amt !== 'number') {
			return '\u2014'
		}
		let str = Math.abs(amt).toFixed(2)
		if (amt < 0) {
			str = `(${str})`
		}
		return amt !== 0 ? `$${str}` : '\u2014'
	}
})
.filter('sum', () => {
	return function(data, account) {
		let sum = 0
		data.forEach((t) => {
			if (!angular.isUndefined(account) && t.account === account) sum += t.amount
			else if (angular.isUndefined(account)) sum += t.amount
		})
		return sum
	}
})
