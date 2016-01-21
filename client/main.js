/**
 * Created by xhitedev on 12/31/15.
 */

var angular = require('angular');

var bootstrap = require('angular-ui-bootstrap');

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

function controller($scope, $router, $location, user) {
    this.navs = [
        {id: "bills", name: "Dépenses"},
        {id: "recent", name: "Historique"},
        {id: "account", name: "Compte"},
        //{id: "group", name: "Group" },
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
    $scope.user.refreshUserStatus();
    if(!$scope.user.isConnected){
		$location.path('/login');   
	} else {
		$location.path('/bills');
	}
}

controller.$inject = ['$scope', '$router', '$location', 'user'];

controller.$routeConfig = [
    { path: '/', components: { container: "bills", popup: "modal"}, as: "bills"},
    { path: '/bills', components: { container: "bills", popup: "modal"}, as: "bills"},
    { path: '/recent', component: { container: "recent", popup: "modal"}, as: "recent"},
    { path: '/account', component: { container: "account", popup: "modal"}, as: "account"},
    { path: '/group', component: { container: "group", popup: "modal"}, as: "group"},
    { path: '/login', component: {container: "login", popup: "modal" }, as: "login"},
    { path: '/register', component: {container: "register", popup: "modal" }, as: "register"}
]

billsApp.service('UserService', user);
billsApp.controller('AppController', controller);