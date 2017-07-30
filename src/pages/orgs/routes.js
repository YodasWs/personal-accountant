'use strict';

angular.module('pageOrgs')
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$routeProvider.when('/org/:id', {
		templateUrl: 'pages/orgs/orgs.html',
	})
	$routeProvider.when('/orgs/', {
		templateUrl: 'pages/orgs/orgs.html',
	})
}])
