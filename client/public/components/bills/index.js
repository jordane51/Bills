/**
 * Created by xhitedev on 1/4/16.
 */

var angular = require('angular');

var bills = angular.module('bills', []);

function controller() {
    this.total = 0;
    this.owe = 0;
    this.owed = 0;
}

bills.controller('BillsController', controller);

module.exports = 'bills';