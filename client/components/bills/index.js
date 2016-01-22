/**
 * Created by xhitedev on 1/4/16.
 */

var angular = require('angular')

var bills = angular.module('bills', [require('../modal')])

function controller($log, modalParams, $http, user) {
    this.bills = []
    $http({
        url: '/api/bills',
        method: 'GET',
        headers: {'Authorization': user.token}
    }).then(
        function (resBills) {
            this.bills = resBills.data
            for(var i = 0; i<this.bills.length; ++i){
                var bill = this.bills[i]
                bill.description = bill.title
                for(var j = 0; j<bill.group.length; ++j){
                    var group = bill.group[j]
                    $http({
                        url: '/api/users/'+group.userId,
                        method: 'GET',
                        headers: {'Authorization': user.token}
                    }).then(
                        function (resUser) {
                            group.userName = resUser.data.name
                            group.email = resUser.data.email
                        }.bind(this),
                        function (res) {
                            console.log('bills request error')
                        }
                    )
                }
            }
        }.bind(this),
        function (res) {
            console.log('user request error')
        })

    this.delete = function (i) {
        $http({
            url: '/api/bills/' + this.bills[i]._id,
            method: 'DELETE',
            headers: {'Authorization': user.token}
        }).then(
            function (res) {
                this.bills.splice(i, 1)
                console.log('bill deleted')
            }.bind(this),
            function (res) {
                console.log('bill delete request error')
            }
        )
    }
    this.update = function (i) {
        var title = "Modifier une facture"
        var bill = this.bills[i]
        var callback = function (data) {
            $http({
                url: '/api/bills/' + this.bills[i]._id,
                method: 'PUT',
                headers: {'Authorization': user.token},
                data: data
            }).then(
                function (res) {
                    this.bills[i] = data
                    $log.info('Bill updated: ' + data)
                }.bind(this),
                function (res) {
                    $log.info('bill update request error')
                }
            )

            console.log(data)
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
            share: 1,
            group: []
        }
        var title = "Ajouter une facture"
        var callback = function(){
            $http({
                url: '/api/bills',
                method: 'POST',
                headers: {'Authorization': user.token},
                data: newBill
            }).then(
                function (res) {
                    this.bills.push(res.data)
                    $log.info('bill added')
                    console.log(user.token)
                }.bind(this),
                function (res) {
                    $log.info('bill post request error')
                }
            )
        }.bind(this)
        modalParams.setParams(title, newBill, callback)
    }
}

controller.$inject = ['$log', 'modalParams', '$http', 'user']

bills.controller('BillsController', controller)

module.exports = 'bills'