/**
 * Created by xhitedev on 1/4/16.
 */

var angular = require('angular');

var bills = angular.module('bills', []);

function modalController($uibModalInstance, bill) {
    this.bill = {
        name: bill.name,
        email: bill.email,
        amount: bill.amount,
        description: bill.description,
        share: bill.share
    };
    this.submit = function(){
        $uibModalInstance.close(this.bill);
    }
    this.cancel = function(){
        $uibModalInstance.dismiss('cancel');
    }
}

modalController.$inject = ['$uibModalInstance', 'bill'];

function controller($uibModal, $log) {
    this.bills = [
        {name: 'John', amount:10, description:'food', share: 1},
        {name: 'Doe', amount:20, description:'dog food', share: 0.2}
    ];
    function getModalInstance(bill){
        return $uibModal.open({
            templateUrl: 'modalContent.html',
            controller: modalController,
            controllerAs: 'form',
            bindToController: true,
            size: 'md',
            resolve: {
                bill: function(){
                    return bill;
                }
            }
        });
    }
    this.update = function (index) {
        var modalInstance = getModalInstance(this.bills[index]);
        modalInstance.result.then(
            function (data) {
                this.bills[index] = data;
                $log.info('Bill updated: ' + data);
            }.bind(this),
            function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
    };
    this.add = function () {
        var modalInstance = getModalInstance({});
        modalInstance.result.then(
            function (data) {
                this.bills.push(data)
            }.bind(this),
            function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}

controller.$inject = ['$uibModal', '$log'];

bills.controller('BillsController', controller);

module.exports = 'bills';