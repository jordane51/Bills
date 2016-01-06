/**
 * Created by xhitedev on 12/31/15.
 */

var angular = require('angular');

var bootstrap = require('angular-ui-bootstrap');

require('angular-new-router');

var bills = require('./components/bills');
var recent = require('./components/recent');
var account = require('./components/account');

var billsApp = angular.module('billsApp', [
    bootstrap,
    'ngNewRouter',
    bills,
    recent,
    account
]);

function controller($router) {
    this.navs = [
        {id: "bills", name: "Dépenses"},
        {id: "recent", name: "Historique"},
        {id: "account", name: "Compte"}
    ];
    this.active = this.navs[0];
    this.toggled = false;
    this.setActive = function(current){
        this.active = current;
    };
    this.toggle = function(){
        this.toggled = !this.toggled;
    };
}

controller.$inject = ['$router'];

controller.$routeConfig = [
    { path: '/', component: "bills" },
    { path: '/recent', component: "recent" },
    { path: '/account', component: "account" }
];

billsApp.controller('AppController', controller);