var angular = require('angular');

var user = angular.module('user', []).factory('user', function(){
	return {
		isConnected: false,
		hasDisconnected: false,
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
		}
	};
});

module.exports = 'user';