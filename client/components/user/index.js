var angular = require('angular');

var user = angular.module('user', []).factory('user', ['$cookies', function($cookies){
	return {
		isConnected: false,
		hasDisconnected: false,
		token: '',
		showDisconnectedInfo: function(){
			if(this.hasDisconnected){
				this.hasDisconneceted = false;
				return true;
			}
			return false;
		},
		diconnect: function(){
			this.hasDisconnected = true;
			this.isConnected = false;
			$cookies.remove('connectedUser');
		},
		connect: function(token){
			this.isConnected = true;
			this.token = token;
			$cookies.put('connectedUser', token);
		},
		refreshUserStatus: function(){
			if($cookies.get('connectedUser')){
				this.isConnected = true;
				this.token = $cookies.get('connectedUser');
			}
		}
	};
}]);

module.exports = 'user';