'use strict';

angular.module('myBooks', [
	'ngRoute',
	'appNav',
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.when('/', {
		templateUrl: 'pages/home.html',
	})
}]);
