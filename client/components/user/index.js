var angular = require('angular');

var user = angular.module('user', []).factory('user', ['$cookies', function($cookies){
	return {
		name: '',
		email: '', 
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
			$cookies.remove('connectedUser');
			$cookies.remove('connectedUserName');
			$cookies.remove('connectedUserEmail');
			this.hasDisconnected = true;
			this.isConnected = false;
			this.user.name = '';
			this.user.email = '';
		},
		connect: function(token, name, email){
			this.isConnected = true;
			this.token = token;
			this.name = name;
			this.email = email;
			$cookies.put('connectedUser', token);
			$cookies.put('connectedUserName', name);
			$cookies.put('connectedUserEmail', email);
		},
		refreshUserStatus: function(){
			if($cookies.get('connectedUser')){
				this.isConnected = true;
				this.token = $cookies.get('connectedUser');
				this.email = $cookies.get('connectedUserEmail');
				this.name = $cookies.get('connectedUserName');
			}
		}
	};
}]);

module.exports = 'user';