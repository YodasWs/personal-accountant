'use strict';

angular.module('pageCalcs')
.controller('ctrlCalcs', [ '$scope', ($s) => {
	angular.element('[ng-view]').attr('ng-view', 'page-calcs')
	Number.isNumeric=function(n){return !Number.isNaN(Number.parseFloat(n))&&isFinite(n)};
	Number.isFinite=Number.isFinite||function(n){return typeof n==='number'&&isFinite(n)};
	String.prototype.padLeft = function (p) {
		return String(p + this).slice(-p.length);
	};
	String.prototype.padRight = function (p) {
		return String(this + p).slice(0, p.length);
	};
	Math.round10 = function(v,e) {
		if (typeof e === 'undefined' || +e === 0) return Math.round(v)
		v = +v
		e = +e
		if (Number.isNaN(v) || !Number.isInteger(e)) return NaN
		v = v.toString().split('e')
		v = Math.round(+(v[0]+'e'+(v[1]?(+v[1]-e):-e)))
		v = v.toString().split('e')
		v = (+(v[0]+'e'+(v[1]?(+v[1]+e):e))+'').split('.')
		return v[0] + '.' + (v.length > 1 ? v[1].padRight('00') : '00')
	};
	Number.Currency=Number.Currency||{};
	Number.Percent=Number.Percent||{};
	String.toFloat = function(n) {
		if (typeof n == 'string') {
			if (!Number.isNumeric(n)) return '&empty;'
			n = +n
		}
		if (Number.isNaN(n)) return '&empty;'
		if (!Number.isFinite(n)) return '&infin;'
		return n
	}
	Number.Currency.format = function(n) {
		n = String.toFloat(n)
		return typeof n == 'number' ? '$' + Math.round10(n, -2) : n
	};
	Number.Percent.format = function(n) {
		n = String.toFloat(n)
		return typeof n == 'number' ? Math.round10(n * 100, -2) + '%' : n
	};
	Date.intMon = function(n) {
		n = String.toFloat(n)
		return typeof n == 'number' ? Math.ceil(n) + ' months' : n
	};
	// Uniform Calculator Input Validation and Calculation Start
	$(document).on('input', 'input,select', function(e) {
		let _t = $(this)
		if (_t.attr('type') == 'number' && !Number.isNumeric(_t.val())) {
			$(e.target).parents('section').find('output').html('&#x26a0;')
			return false
		}
		$(e.target).parents('section').trigger({
			target:e.target,
			type:'calc'
		})
	// Uniform Event Fire
	}).on('click', '[data-action]', function(e) {
		$(e.target).parents('section').trigger({
			calc: $(e.target).closest('section'),
			type:$(e.target).attr('data-action'),
			target:e.target
		})
	})
	// Uniform Calculator Resource Gathering
	$('section').on('calc', function(e) {
		e.calc = $(e.target).closest('section')
		e.$o = e.calc.find('output')
		e.out = []
	}).on('save', function(e) {
		if (!e.calc.children('table').length) return
		e.$o = e.calc.find('output')
	})
	// Uniform Calculator Results Output
	$('section').on('output', function(e) {
		if (e.out.length && e.out.length <= e.$o.length) e.out.forEach(function(o, i) {
			let el = $(e.$o[i])
			if (el.is('.money')) o = Number.Currency.format(o)
			else if (el.is('.months')) o = Date.intMon(o)
			else if (el.is('.percent')) o = Number.Percent.format(o)
			el.html(o)
		})
	})
	$('section.loan').on('calc', function(e) {
		let pmt = e.calc.find('input[name="payment"]').val() || 0,
			p = e.calc.find('input[name="principal"]').val() || 0,
			r = e.calc.find('input[name="interest"]').val() || 0,
			t = e.calc.find('input[name="period"]').val() || 0
		r /= 1200
		switch (e.calc.attr('id')) {
		case 'total':
			e.out.push(r * p * t / (1 - Math.pow(1 + r, -t)))
			e.out.unshift(e.out[0] - p)
			break;
		case 'monthly':
			e.out.push(r * p / (1 - Math.pow(1 + r, -t)))
			break;
		case 'period':
			if (!Number.isNumeric(r)) e.out.push('&empty;')
			else if (r !== 0)
				e.out.push((Math.log(pmt / p) - Math.log(pmt / p - r)) / Math.log(1 + r))
			else e.out.push(p / pmt)
			break;
		}
		e.type = 'output'
		$(this).trigger(e)
	}).on('save', function(e){
		let pmt = e.calc.find('input[name="payment"]').val() || 0,
			p = e.calc.find('input[name="principal"]').val() || 0,
			r = e.calc.find('input[name="interest"]').val() || 0,
			t = e.calc.find('input[name="period"]').val() || 0,
			row = $('<tr>')
		r /= 1200
		switch (e.calc.attr('id')) {
		case 'total':
			row.append('<td>' + p)
			row.append('<td>' + $(e.$o[0]).val())
			break;
		}
		if (row.children('td,th').length) $(e.calc.children('table')[0]).append(row).show()
	})
	$('section.finance').on('calc', function(e) {
		let inf = e.calc.find('input[name="inflation"]').val() || 0,
			pmt = e.calc.find('input[name="payment"]').val() || 0,
			inc = e.calc.find('input[name="income"]').val() || 0,
			t = e.calc.find('input[name="period"]').val() || 0
		inf /= 100
		switch (e.calc.attr('id')) {
		case 'leverage':
			e.out.push(pmt * 12 / inc)
			e.$o.css('color', e.out[0] > 1/3 ? 'red' : 'black')
			break;
		case 'realreturn':
			e.out.push(inc / pmt / (1 + inf) - 1)
			break;
		case 'annuity':
			if (inf != 0) {
				e.out.push(pmt * (1 / inf - 1 / (inf * Math.pow(1 + inf, t))))
				e.out.push(pmt * (Math.pow(1 + inf, t) - 1) / inf)
			} else {
				e.out.push(pmt * t)
				e.out.push(pmt * t)
			}
			break;
		}
		e.type = 'output'
		$(this).trigger(e)
	})
	$('section.invest').on('calc', function(e) {
		let commission = e.calc.find('input[name="commission"]').val() || 0,
			sellPrice = e.calc.find('input[name="sell_price"]').val() || 0,
			buyPrice = e.calc.find('input[name="buy_price"]').val() || 0,
			shares = e.calc.find('input[name="shares"]').val() || 0,
			roi = e.calc.find('input[name="roi"]').val() || 0,
			totalBuy = 0
		commission = Number.parseFloat(commission)
		buyPrice = Number.parseFloat(buyPrice)
		shares = Number.parseInt(shares, 10)
		roi = Number.parseFloat(roi) / 100
		switch (e.calc.attr('id')) {
		case 'roi':
			totalBuy = buyPrice * shares + commission
			e.out.push(totalBuy)
			if (shares > 0) {
				sellPrice = (2 + roi) * totalBuy / shares
			} else {
				sellPrice = '&empty;'
			}
			e.out.push(sellPrice)
			break;
		}
		e.type = 'output'
		$(this).trigger(e)
	})
	$('section, #ge, #le').each(function(){
		$(this).trigger({
			target:this,
			type:'calc'
		})
	})
}])
