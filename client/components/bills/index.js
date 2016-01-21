/**
 * Created by xhitedev on 1/4/16.
 */

var angular = require('angular')

var bills = angular.module('bills', [require('../modal')])

function controller($router, $log, modalParams, $http, user) {
    $http({
        url: '/auth/login',
        method: 'POST',
        data: {email: user.email, password: user.password}
    }).then(function(res) {
        $http({
            url: '/api/bills',
            method: 'GET',
            headers: {'Authorization': res.data.token}
        }).then(
            function (resBills) {
                console.log(resBills.data)
            },
            function (res) {
                console.log('bills request error')
            })
    })

    this.bills = [
        { name: 'John', amount: 10, description: 'food', share: 1, date: new Date(), owe: 0 },
        { name: 'Doe', amount: 20, description: 'dog food', share: 0.2, date: new Date(), owe: 0 }
    ]
    this.delete = function (i) {
        this.bills.splice(i, 1)
    }
    this.update = function (i) {
        var title = "Modifier une facture"
        var bill = this.bills[i]
        var callback = function (data) {
            this.bills[i] = data
            $log.info('Bill updated: ' + data)
        }.bind(this)
        modalParams.setParams(title, bill, callback)
    }

    this.add = function () {
        var newBill = {
            name: '',
            email: '',
            date: new Date(),
            amount: 0,
            description: '',
            share: 1
        }
        var title = "Modifier une facture"
        modalParams.setParams(title, newBill, function(){})

    }
    $router.config([
        { path: '/', component: "modal" }
    ])
}


controller.$inject = ['$router', '$log', 'modalParams', '$http', 'user']

bills.controller('BillsController', controller)

module.exports = 'bills'