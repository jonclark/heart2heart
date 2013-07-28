'use strict';

angular.module('myApp', ['ngResource', 'individualListServices', 'biometricServices'])
	.config(function($routeProvider) {
	    $routeProvider.
	      when('/', {controller:biometricListCtrl, templateUrl:'individual.html'}).
	      when('/person', {controller:biometricListCtrl, templateUrl:'individual.html'}).
	      when('/list', {controller:individualListCtrl, templateUrl:'individuals.html'}).
	      otherwise({redirectTo:'/'});
	  });
