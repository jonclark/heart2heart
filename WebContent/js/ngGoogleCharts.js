"use strict";
 
var googleChart = googleChart || angular.module("google-chart",[]);
 
googleChart.directive("googleChart",function(){
    return{
        restrict : "A",
        link: function($scope, $elem, $attr){
            
            var dt = $scope[$attr.ngModel].dataTable;
     
            var options = {
            		'width' : '600',
            		'height' : '600',
            		'hAxis.viewWindowMode' : 'pretty',
            		'vAxis.viewWindowMode' : 'pretty',
            		'legend.position' : 'bottom'
            };
            if($scope[$attr.ngModel].title)
                options.title = $scope[$attr.ngModel].title;
 
            var googleChart = new google.visualization[$attr.googleChart]($elem[0]);
            
            while ($scope.chartReady) {
            	console.log("Waiting for data to load...");
        	}
    
            googleChart.draw(dt,options);
        }
    };
});
