'use strict';

//var IndividualList = $resource('https://api.cigna.com/services/v1/individuals/me?access_token=19265589-52e5-4a62-9e20-26533913609e');
//var list;

angular.module('myApp', ['ngResource', 'individualListServices']);
angular.module('myApp2', ['ngResource', 'biometricServices']);

/*config(['$routeProvider', function($routeProvider) {
$routeProvider.
    when('/phones', {templateUrl: 'partials/phone-list.html', controller: IndividualListCtrl}).
    otherwise({redirectTo: '/phones'});
}]);
*/