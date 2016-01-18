/**
 * Created by xhitedev on 1/4/16.
 */

var angular = require('angular');

var recent = angular.module('account', []);

function controller() {
    this.user = {
        name: 'John',
        email: 'john@toto.com',
        password: 'passwd',
        description: 'cool dude'
    };
    this.cancel = function(){}
    this.submit = function(){}
}

recent.controller('AccountController', controller);

module.exports = 'account';