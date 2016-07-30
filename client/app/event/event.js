angular.module('Khitwa.event', [])
.controller('EventCtrl', function ($scope, Events,$window, $routeParams, Auth, $location) {
	$scope.signout = function(){
		Auth.signout();
	}
	$scope.userId = window.userId;

	$scope.join = function(){
		Events.joinEvent($scope.userId,$routeParams.id)
		.then(function(){
			$location.path('/user/:id')
		})
	}

	$scope.showEvent = function(){
		Events.getEvent($routeParams.id)
		.then(function(event){
			$scope.event = event;
		})
		.catch(function (error) {
        console.error(error);
      });
	}
	$scope.showEvent();


$scope.users={};

$scope.showUsers = function(){
	Events.getAllUser()
	.then(function(users){
		$scope.users.userName = users;
	})
	.catch(function(error){
		console.log(error)
	})
}

// $scope.message = function(){
// 	$location.path('/message')
// }



});