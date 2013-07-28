function individualListCtrl($scope, IndividualList) {
	$scope.individualList = IndividualList.query();
}

function biometricListCtrl($scope, $http, $filter, BiometricList) {
	$scope.biometricList = BiometricList.query();

	window.$scope = $scope;
	window.$http = $http;
	
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

		//$scope.$http({url:"https://api.cigna.com/services/v1/biometrics?access_token=" + authToken, method:"POST", data:data})
		$http.post("https://api.cigna.com/services/v1/biometrics?access_token=" + authToken, data)
			.success(function(data) {
				console.log("SUCCESS", data);
			})
			.error(function(){
				console.log("ERROR");
			});
	};

}

/*
var HeartBeat = $resource('/user/:userId/card/:cardId',
		 {userId:123, cardId:'@id'}, {
		  charge: {method:'POST', params:{charge:true}}
		 });
*/

/*
$scope.go = function ( hash ) {
	  $location.hash( hash );
};
	

var submitHeartbeat = $resource()

*/