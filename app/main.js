;(function() {
	'use strict';

	angular.module('app', ['ui.router'])
	.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/'
			});

	});
})();
