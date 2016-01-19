var angular = require('angular');

var user = angular.module('user', []).factory('UserService', function(){
	return {isConnected: false};
});

module.exports = 'user';