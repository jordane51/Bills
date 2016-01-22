
var angular = require('angular');

var recent = angular.module('group', []);

function modalController($uibModalInstance, group){
    this.group = {
        name: group.name,
        members: {pseudo: group.members.pseudo, email: group.members.email}
    };
    this.submit = function(){
        $uibModalInstance.close(this.group);
    }
    this.cancel = function(){
        $uibModalInstance.dismiss('cancel');
    }
}
modalController.$inject = ['$uibModalInstance', 'group'];
/*
function controller($scope, $resource, $rootScope, $cookies, $location, group, Notification) {
	$scope.group = group.group;
	$scope.Listegroups = [];
	$scope.name="";
	 	if($scope.name){
	 		$scope.list.push(this.name);
			$scope.MemberNumber = [1,2];
			$scope.group.members = [];
			$scope.group.members[0] = {
			    pseudo:$rootScope.currentUser.pseudo,
			    email:$rootScope.currentUser.email
			}
			var addMember= $scope.MemberNumber.length+1;
				
			$scope.add = function() {
			   $scope.MemberNumber.push(addMember++);
			}
			
			$scope.send = function() {
			    $scope.group.$save(function(result){						
			   		if(result.error == null){
						    location.reload();
					}else{
						    Notification.error({message: result.error, positionY: 'bottom', positionX: 'right'});
					}
			    }).catch(function(req){
					Notification.error({message: "Une erreur s'est produite", positionY: 'bottom', positionX: 'right'});				    });
					}
		}
}*/
function controller($uibModal, $log) {
    this.group = [
        {name: 'Group1', members:[pseudo:'John', email:'test@test.fr'}
    ];
    function getModalInstance(group){
        return $uibModal.open({
            templateUrl: 'modalContent.html',
            controller: modalController,
            controllerAs: 'form',
            bindToController: true,
            size: 'md',
            resolve: {
                group: function(){
                    return group;
                }
            }
        });
    }
    this.update = function (index) {
        var modalInstance = getModalInstance(this.group[index]);
        modalInstance.result.then(
            function (data) {
                this.group[index] = data;
                $log.info('Group updated: ' + data);
            }.bind(this),
            function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
    };
    this.add = function () {
        var modalInstance = getModalInstance({});
        modalInstance.result.then(
            function (data) {
                this.group.push(data)
            }.bind(this),
            function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}


controller.$inject = ['$uibModal', '$log'];
recent.controller('GroupController', controller);

module.exports = 'group';