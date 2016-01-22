/**
 * Created by xhitedev on 1/18/16.
 */

var modal = angular.module('modal', [])

function controller($uibModalInstance, $http, bill, title, user) {
    this.title = title
    this.bill = {
        name: bill.name,
        email: bill.email,
        date: new Date(bill.date),
        amount: bill.amount,
        description: bill.description,
        share: bill.share,
        group: bill.group
    }

    this.users = []/*
    $http({
        url: '/api/users',
        method: 'POST',
        headers: {'Authorization': user.token},
        data:
    }).then(
        function (res) {
            this.bills.push(res.data)
            $log.info('bill added')
        }.bind(this),
        function (res) {
            $log.info('bill post request error')
        }
    )*/
    this.addEmail = function(){
        this.bill.group.push({owed:0})
    }
    this.submit = function(){
        var group = this.bill.group
        for(var i = 0; i<group.length; ++i){
            var group = group[i]
            $http({
                url: '/api/users/email/'+ group.email,
                method: 'GET',
                headers: {'Authorization': user.token}
            }).then(
                function (res) {
                    group.userId = res.data._id
                }.bind(this),
                function (res) {
                    group.userName = group.email
                }
            )
        }
        $uibModalInstance.close(this.bill)
    }
    this.cancel = function(){
        $uibModalInstance.dismiss('cancel')
    }
}

controller.$inject = ['$uibModalInstance', '$http', 'bill', 'title', 'user']

function modalController() {}

modal.controller('ModalController', modalController)

function modalParams($uibModal, $log) {
    function getModalInstance(bill, title){
        return $uibModal.open({
            templateUrl: 'modalContent.html',
            controller: controller,
            controllerAs: 'form',
            bindToController: true,
            size: 'md',
            resolve: {
                bill: function(){
                    return bill
                },
                title: function(){
                    return title
                }
            }
        });
    }
    var params = { title: '', bill: {}, callback: '' }
    var getter = function(){ return params }
    var setter = function(title, bill, callback) {
        getModalInstance(bill, title).result.then(
            callback,
            function () {
                $log.info('Modal dismissed at: ' + new Date())
            })
        params.title = title
        params.bill = bill
        params.open = open
        params.callback = callback
    }
    var attrs = { getParams: getter , setParams: setter }
    return attrs;
}

modalParams.$inject = ['$uibModal', '$log']

modal.factory('modalParams', modalParams)


module.exports = 'modal'