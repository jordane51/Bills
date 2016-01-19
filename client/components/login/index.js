/**
 * Created by xhitedev on 1/4/16.
 */

var angular = require('angular');

var login = angular.module('login', []).controller('LoginController', ['$scope', '$http', function($scope, $http) {
	$scope.user = {
		email: "",
		password: ""
	}
	
	$scope.loginError = false;
	
	$scope.update = function(user){
		if(!$scope.user.email || !$scope.user.password){
			$scope.loginError = true;
		} else {
			console.log("Trying to log in user: " + user.email);
			$http({
				url: '/auth/login',
				method: 'POST',
				data: {email: user.email, password: user.password}}
				).then(function(res){
					console.log(res);
				}, function(res){
					
				});
		}
	}
	
}]);


module.exports = 'login';