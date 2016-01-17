/**
 * Created by xhitedev on 1/4/16.
 */

var angular = require('angular');

var bills = angular.module('bills', []);

function controller() {
    this.bills = [
        {name: 'John', amount:100, description:'food'},
        {name: 'Doe', amount:20, description:'dog food'}
    ];
}

bills.controller('BillsController', controller);

module.exports = 'bills';