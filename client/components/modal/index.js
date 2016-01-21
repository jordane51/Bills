/**
 * Created by xhitedev on 1/18/16.
 */

var modal = angular.module('modal', [])

function controller($uibModalInstance, bill, title) {
    this.title = title

    this.bill = {
        name: bill.name,
        email: bill.email,
        date: bill.date,
        amount: bill.amount,
        description: bill.description,
        share: bill.share
    }

    this.submit = function(){
        $uibModalInstance.close(bill)
    }
    this.cancel = function(){
        $uibModalInstance.dismiss('cancel')
    }
}

controller.$inject = ['$uibModalInstance', 'bill', 'title']

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