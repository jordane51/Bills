/**
 * Created by xhitedev on 1/4/16.
 */

var angular = require('angular');

var register = angular.module('register', []).controller('RegisterController', ['$scope', '$http', '$location', '$cookies', 'user', function($scope, $http, $location, $cookies, user) {	
	$scope.registerError = false;
	$scope.registerErrorMessage = '';

	$scope.update = function(user){
		if(!$scope.user.email || !$scope.user.password || !$scope.user.name){
			$scope.registerError = true;
			$scope.registerErrorMessage = 'Missing fields.';
		} else {
			$http({
				url: '/auth/register',
				method: 'POST',
				data: {email: user.email, password: user.password, name: user.name}}
				).then(function(res){
					$http({
						url: '/api/users/me',
						method: 'GET',
						headers: {'Authorization': res.data.token}}
						).then(function(resMe){
							user.connect(res.data.token, resMe.data.name, resMe.data.email);
							$location.path ('/');
						}, function(res){
							$scope.registerError = 'Could not find user.';
						});	
					}, 
					function(res){
						$scope.registerErrorMessage = res.data;
						$scope.registerError = true;
					});
		}
	}
}]);


module.exports = 'register';