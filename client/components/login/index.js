/**
 * Created by xhitedev on 1/4/16.
 */

var angular = require('angular');

var login = angular.module('login', []).controller('LoginController', ['$scope', function($scope) {
	$scope.user = {
		email: "",
		password: ""
	}
	
	$scope.loginError = false;
	
	$scope.update = function(user){
		if(!$scope.user.email || !$scope.user.password){
			$scope.loginError = true;
		} else {
			// do the login
			
		}
	}
	
}]);


module.exports = 'login';