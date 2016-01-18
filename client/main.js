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
<<<<<<< HEAD
var group = require('./components/group');
=======
>>>>>>> 021156de60d2fe371a507431035bd993803999b6

var billsApp = angular.module('billsApp', [
    bootstrap,
    'ngNewRouter',
    bills,
    recent,
    account,
<<<<<<< HEAD
    group,
=======
>>>>>>> 021156de60d2fe371a507431035bd993803999b6
    login,
    register
]);

function controller($router) {
    this.navs = [
        {id: "bills", name: "Dépenses"},
        {id: "recent", name: "Historique"},
        {id: "account", name: "Compte"},
<<<<<<< HEAD
        {id: "group", name: "Group" },
=======
>>>>>>> 021156de60d2fe371a507431035bd993803999b6
        {id: "login", name: "Login"},
        {id: "register", name: "Register"}
    ];
    this.active = this.navs[0];
    this.toggled = false;
    this.setActive = function(current){
        this.active = current;
    };
<<<<<<< HEAD
     this.toggle = function(){
=======
    this.toggle = function(){
>>>>>>> 021156de60d2fe371a507431035bd993803999b6
        this.toggled = !this.toggled;
    };
}

controller.$inject = ['$router'];

controller.$routeConfig = [
    { path: '/', component: "bills" },
    { path: '/recent', component: "recent" },
    { path: '/account', component: "account" },
<<<<<<< HEAD
    { path: '/group', component: "group" },
=======
>>>>>>> 021156de60d2fe371a507431035bd993803999b6
    { path: '/login', component: "login" },
    { path: '/register', component: "register" }
];

billsApp.controller('AppController', controller);