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
		},
		checkIfConncted: function(){
			
		}
	};
}]);

module.exports = 'user';