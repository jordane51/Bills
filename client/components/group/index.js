
var angular = require('angular');

var recent = angular.module('group', []);

function controller($scope, $resource, $rootScope, $cookies, $location, Notification) {
	var Groups = $resource("http://localhost:3000/group");
	$scope.group = new Group();
	Groups.query(function(result){
					$scope.Listegroups = result;
					})
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
						Notification.error({message: "Une erreur s'est produite", positionY: 'bottom', positionX: 'right'});
					    });
					}
}

recent.controller('GroupController', controller);

module.exports = 'group';