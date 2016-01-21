var angular = require('angular');


var recent = angular.module('recent', []).controller('RecentController', ['$scope', '$http', '$location', '$cookies', 'user', function($scope, $http, $location, $cookies, user) {
	$scope.logs;
	$scope.rawLogs;
	$scope.errorMessage;
	
	var getNameOfUserById = function(bill, userId, callback){
		$http({
			url: '/api/users/' + userId,
			method: 'GET',
			headers: {'Authorization': user.token}}
			).then(function(res){
				callback(bill, res.data.name);
			}, function(res){
				$scope.errorMessage = 'Error while fetching user';
		});
	};
	
	var getTitleOfBillById = function(bill, billId, callback){
		$http({
			url: '/api/bills/' + billId,
			method: 'GET',
			headers: {'Authorization': user.token}}
			).then(function(res){
				callback(bill, res.data.title);
			}, function(res){
				$scope.errorMessage = 'Error while fetching bill';
		});
	};
	
	var getActionText = function(action){
		switch(action){
			case 'reimburse':
				return 'reimbursed';
			break;
			case 'delete':
				return 'deleted';
			break;
			case 'create':
				return 'created';
			break;
			default:
			break;
		}
	}
	
	$scope.parseLogs = function(){
		$scope.logs = [];
		for(var i = 0; i < $scope.rawLogs.length; i++){
			var bill = $scope.rawLogs[i];
			getNameOfUserById(bill, bill.userId, function(bill, userName){
				getTitleOfBillById(bill, bill.billId, function(bill, billTitle){
					$scope.logs.push({
						'username': userName,
						'title': billTitle,
						'action': getActionText(bill.action),
						'amount': bill.amountBefore - bill.amountAfter
					});
				});
			});
		}
	};

	$http({
		url: '/api/users/me',
		method: 'GET',
		headers: {'Authorization': user.token}}
		).then(function(resU){
			$http({
				url: '/api/logs/user/' + resU.data._id,
				method: 'GET',
				headers: {'Authorization': user.token}}
				).then(function(res){
					$scope.rawLogs = res.data;
					$scope.parseLogs();
				}, function(res){
					$scope.errorMessage = 'Error while fetching logs';
			});
		}, function(res){
			$scope.errorMessage = 'Error while fetching user';
	});
}]);


module.exports = 'recent';