var angular = require('angular');

var account = angular.module('account', []).controller('AccountController', ['$scope', '$http', '$location', '$cookies', 'user', function($scope, $http, $location, $cookies, user) {	
	$scope.errorMessage;
	$scope.infoMessage;
	
	$scope.newPassword;

	$scope.updatePassword = function(){
		if(!$scope.newPassword){
			return;
		}
		if($scope.newPassword.length < 4){
			$scope.errorMessage = 'Password must be at least 4 characters long.';
			$scope.infoMessage = null;
		} else {
			$http({
			url: '/api/users/password',
			method: 'POST',
			headers: {'Authorization': user.token},
			data: {'password': $scope.newPassword}}
			).then(function(res){
				$scope.infoMessage = 'Password updated successfully';
				$scope.errorMessage = null;
			}, function(res){
				$scope.errorMessage = 'Internal error';
				$scope.infoMessage = null;
			});
		}
	}
}]);


module.exports = 'account';