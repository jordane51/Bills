var angular = require('angular');

var user = angular.module('user', []).factory('user', function(){
	return {isConnected: false};
});

module.exports = 'user';