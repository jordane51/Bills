/**
 * Created by xhitedev on 12/31/15.
 */

var angular = require('angular');

var bootstrap = require('angular-ui-bootstrap');

require('angular-new-router');

var bills = require('./components/bills');
var recent = require('./components/recent');

var billsApp = angular.module('billsApp', [
    bootstrap,
    'ngNewRouter',
    bills,
    recent
]);

function controller($router) {
    this.navs = [
        {id: "bills", name: "Dépenses"},
        {id: "recent", name: "Historique"}
    ];
    this.active = this.navs[0];
    this.setActive = function(current){
        this.active = current;
    };
}

controller.$inject = ['$router'];

controller.$routeConfig = [
    { path: '/', component: "bills" },
    { path: '/recent', component: "recent" }
];

billsApp.controller('AppController', controller);