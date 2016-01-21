/**
 * Created by xhitedev on 1/4/16.
 */

var angular = require('angular');

var login = angular.module('login', []).controller('LoginController', ['$scope', '$http', '$location', '$cookies', 'user', function($scope, $http, $location, $cookies, user) {	
	$scope.loginError = false;

	$scope.update = function(user){
		if(!$scope.user.email || !$scope.user.password){
			$scope.loginError = true;
		} else {
			$http({
				url: '/auth/login',
				method: 'POST',
				data: {email: user.email, password: user.password}}
				).then(function(res){
					$http({
						url: '/api/users/me',
						method: 'GET',
						headers: {'Authorization': res.data.token}}
						).then(function(resMe){
							user.connect(res.data.token, resMe.data.name, resMe.data.email);
							$location.path('/');
						}, function(res){
							$scope.loginError = true;
						});	
				}, function(res){
					$scope.loginError = true;
				});
		}
	}
}]);

module.exports = 'login';