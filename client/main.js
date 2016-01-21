/**
 * Created by xhitedev on 12/31/15.
 */

var angular = require('angular')

var bootstrap = require('angular-ui-bootstrap')

require('angular-new-router');
require('angular-cookies');

var bills = require('./components/bills');
var recent = require('./components/recent');
var account = require('./components/account');
var login = require('./components/login');
var register = require('./components/register');
var group = require('./components/group');
var user = require('./components/user/');
var modal = require('./components/modal');

var billsApp = angular.module('billsApp', [
    bootstrap,
    'ngNewRouter',
    'ngCookies',
    bills,
    recent,
    account,
    group,
    login,
    register,
    modal,
    user
]);

function controller($scope, $router, user) {
    this.navs = [
        {id: "bills", name: "Dépenses"},
        {id: "recent", name: "Historique"},
        {id: "account", name: "Compte"},
        {id: "group", name: "Group" },
    ];
    this.active = this.navs[0];
    this.setActive = function(current){
        this.active = current;
    };
    this.toggled = false;
    this.toggle = function(){
        this.toggled = !this.toggled;
    };
    $scope.user = user;
}

controller.$inject = ['$scope', '$router', 'user'];

controller.$routeConfig = [
    { path: '/', components: { container: "bills", popup: "modal"} },
    { path: '/recent', component: "recent" },
    { path: '/account', component: "account" },
    { path: '/group', component: "group" },
    { path: '/login', component: "login" },
    { path: '/register', component: "register" }
]

billsApp.service('UserService', user);
billsApp.controller('AppController', controller);