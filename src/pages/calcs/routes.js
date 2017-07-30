'use strict';

angular.module('pageCalcs')
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$routeProvider.when('/calcs/', {
		templateUrl: 'pages/calcs/calcs.html',
		controller: 'ctrlCalcs',
		controllerAs: '$ctrl',
	})
}])
