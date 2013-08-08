function TabsCtrl($scope) {
	/*
	  $scope.tabs = [
	    { title:"Users", content:"List of active users" },
	    { title:"List BPM", content:"List of BPM Readings", disabled: true },
	    { title:"Chart BPM", content:"Chart of BPM Readings", disabled: true }
	  ];
*/
//		  $scope.alertMe = function() {
//	    setTimeout(function() {
//	      alert("You've selected the alert tab!");
//	    });
//	  };
//
	  //$scope.navType = 'pills';
};


function individualListCtrl($scope, IndividualList) {
	$scope.individualList = IndividualList.query();
}

function biometricListCtrl($scope, $http, $filter, BiometricList) {
	$scope.biometricList = BiometricList.query();

	window.$scope = $scope;
	window.$http = $http;
	
	////////// date picker
	/*
	$scope.today = function() {
	    $scope.dt = new Date();
	};
	$scope.today();

	$scope.showWeeks = true;
	$scope.toggleWeeks = function () {
	    $scope.showWeeks = ! $scope.showWeeks;
	};

	$scope.clear = function () {
	    $scope.dt = null;
	};*/
	/////////
	
	/////////////////////////////////////////
	//Send new BPM reading to the server
	$scope.sendBiometricToServer = function(bpmValue) {
		
		var authToken = "19265589-52e5-4a62-9e20-26533913609e";
		var data = {
			authToken: "19265589-52e5-4a62-9e20-26533913609e",
			datetime: $filter('date')(new Date(), "yyyy-MM-ddTHH:mm:ssZ"),
			measurement: {
				code: "heart-rate",
				codeSystem: "cigna",
				uom: "bpm",
				uomSystem: "UCOM",
				value: bpmValue
			},
			origin : {
				id: "1bd1582c-f1ae-4fc9-be2f-eb410b18c97a",
				name: "h2h",
				category: "application"
			}
		};
		$scope.data = data;

		$http.post("https://api.cigna.com/services/v1/biometrics?access_token=" + authToken, data)
			.success(function(data) {
				console.log("SUCCESS", data);
			})
			.error(function(){
				console.log("ERROR");
			});
	};
}


function chartCtrlOLD($scope, BiometricList) {
	console.log("chartCtrl");
	window.$scope = $scope;
	$scope.chartReady = 0;

	/*
	$scope.chartData = {};
    $scope.chartData.dataTable = new google.visualization.DataTable();
    $scope.chartData.dataTable.addColumn("string","Time");
    $scope.chartData.dataTable.addColumn("number","BPM");
	
	console.log("inner chartData.dataTable 1 = " + $scope.chartData.dataTable.toJSON());
	*/
	
	$scope.chartData = {};
    $scope.chartData.dataTable = new google.visualization.DataTable();
    $scope.chartData.dataTable.addColumn("string","Time");
    $scope.chartData.dataTable.addColumn("number","BPM");

    $scope.drawChart = function(){ 
    	console.log("drawChart");
    	myGoogleChart.draw();
     };

    $scope.change = function(){ 
    	console.log("Adding item to data table");
    	$scope.chartReady = $scope.chartReady + 1;
		$scope.chartData = null;
    };
    
    $scope.biometricList = BiometricList.query(function (response) {
		console.log("Setting chart data");
		$scope.chartData = null;
		$scope.chartData = {};
	    $scope.chartData.dataTable = new google.visualization.DataTable();
	    $scope.chartData.dataTable.addColumn("string","Time");
	    $scope.chartData.dataTable.addColumn("number","BPM");

	    $scope.chartData.dataTable.addRow(["XXX", 0.1]);
        $scope.chartData.dataTable.addRow(["YYY", 0.3]);

        var i = 0;
    	for ( ; i<response.result.length;i++) {
        	var bpm = parseInt(response.result[i].measurement.value);
        	if (bpm) {
            	//console.log("loading---> i=" + i + ", " + response.result[i].datetime + "," + bpm);
//        		$scope.chartData.dataTable.addRow(["D", i]);
                $scope.chartData.dataTable.addRow(["AAA", 0.5]);
                $scope.chartData.dataTable.addRow(["AAA", 0.75]);
            	//console.log("inner chartData.dataTable 3 = " + $scope.chartData.dataTable.toJSON());
        	} else {
            	console.log("skipping-->" + response.result[i].datetime + "," + bpm);
        	}
        }
    	console.log("Processed " + i + " data points: " + $scope.chartData.dataTable.toJSON());

    	console.log("CHART IS READY");
    	$scope.chartReady = $scope.chartReady + 1;
    });

    $scope.chartData.dataTable.addRow(["Z", 0.23]);
    $scope.chartData.dataTable.addRow(["ZZ", 0.34]);
	console.log("chartCtrl done");
}



