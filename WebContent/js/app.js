'use strict';

google.setOnLoadCallback(function () {   
    angular.bootstrap(document.body, ['myApp']);
});

google.load('visualization', '1', {packages: ['corechart']}); 
 
angular.module('myApp', ['google-chart', 'ngResource', 'individualListServices', 'biometricServices', 'ui.bootstrap'])
	.config(function($routeProvider) {
		
	    $routeProvider.
		    when('/', {controller:individualListCtrl, templateUrl:'individuals.html'}).
		    when("/chart", {
		        templateUrl:"bpm-chart.html",
		        controller :function ($scope, $routeParams, bioData) {
		    		$scope.chartData = {};
		    	    $scope.chartData.dataTable = new google.visualization.DataTable();
		    	    
		    	    //Add the column titles
		    	    $scope.chartData.dataTable.addColumn("string","Time");
		    	    $scope.chartData.dataTable.addColumn("number","BPM");
	
		    	    //Extract the BPM data from the JSON result
		            var i = 0;
		        	for ( ; i<bioData.result.length;i++) {
		            	var bpm = parseInt(bioData.result[i].measurement.value);
		            	if (bpm) {
		            		//Add any BPM value that is not NaN
		                    $scope.chartData.dataTable.addRow([bioData.result[i].datetime, bpm]);
		            	} else {
		            		//NaN - not a number
		                	console.log("skipping-->" + bioData.result[i].datetime + "," + bpm);
		            	}
		            }
		        	console.log("Processed " + i + " data points: " + $scope.chartData.dataTable.toJSON());
		        },
		        resolve :{
		            bioData:function ($q, $route, BiometricList) {
		                var deferred = $q.defer();
	
		                var result = BiometricList.query(
		                		function (response) {
		                			deferred.resolve(response);
		                		});
		                return deferred.promise;
		            }
		        }
		    }).
		    when('/person', {controller:biometricListCtrl, templateUrl:'individual.html'}).
		    when('/filter', {controller:biometricListCtrl, templateUrl:'individual-filter.html'}).
		    when('/list', {controller:individualListCtrl, templateUrl:'individuals.html'}).
		    otherwise({redirectTo:'/'});
	  });
