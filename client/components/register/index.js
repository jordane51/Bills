/**
 * Created by xhitedev on 1/4/16.
 */

var angular = require('angular');

var register = angular.module('register', []).controller('RegisterController', ['$scope', function($scope) {
	$scope.user = {
		email: "",
		password: ""
	}
	
	$scope.registerError = false;
	
	$scope.update = function(user){
		if(!$scope.user.email || !$scope.user.password){
			$scope.registerError = true;
		} else {
			// do the register
			
		}
	}
	
}]);


module.exports = 'register';