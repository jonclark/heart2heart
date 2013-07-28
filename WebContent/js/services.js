
angular.module('individualListServices', []).
	factory('IndividualList', function($resource){
		return $resource('https://api.cigna.com/services/v1/individuals/me?access_token=:authToken', {}, {
			query: {method:'GET', params:{authToken:'19265589-52e5-4a62-9e20-26533913609e'}, isArray:true}
		});
	}
);

angular.module('biometricServices', []).
	factory('BiometricList', function($resource){
		return $resource('https://api.cigna.com/services/v1/biometrics?access_token=:authToken', {}, {
			query:  {method:'GET', params:{authToken:'19265589-52e5-4a62-9e20-26533913609e'}, isArray:false}
		});
		//, individualId:'1bd1582c-f1ae-4fc9-be2f-eb410b18c97a'}
	}
);
