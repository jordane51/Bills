/**
 * Created by xhitedev on 12/31/15.
 */

var angular = require('angular');

var bootstrap = require('angular-ui-bootstrap');

require('angular-new-router');

var bills = require('./components/bills');
var recent = require('./components/recent');
var account = require('./components/account');
var login = require('./components/login');
var register = require('./components/register');
var group = require('./components/group');
var user = require('./components/user/');


var billsApp = angular.module('billsApp', [
    bootstrap,
    'ngNewRouter',
    bills,
    recent,
    account,
    group,
    login,
    register,
    user
]);

function controller($router) {
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
}

controller.$inject = ['$router'];

controller.$routeConfig = [
    { path: '/', component: "bills" },
    { path: '/recent', component: "recent" },
    { path: '/account', component: "account" },
    { path: '/group', component: "group" },
    { path: '/login', component: "login" },
    { path: '/register', component: "register" }
];

billsApp.controller('AppController', controller);