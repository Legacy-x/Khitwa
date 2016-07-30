angular.module('Khitwa.user', [])
.controller('UserCtrl', function ($scope,$window, Events, $routeParams, Auth) {
	$scope.signout = function(){
		Auth.signout();
	}
	$scope.showUser = function (){
		Events.getUser($routeParams.id)
		.then(function(user){
			$scope.user = user;
		})
		.catch(function (error) {
			console.error(error)
		})
	}
	$scope.showUser();

	var eventId = window.location.href.split('/')[5];
	$scope.users=[];
	
	Events.getAllUsers()
		  .then(function(data){
			console.log(data)
			for (var i = 0; i < data.length; i++) {
				if(data[i].events.indexOf(eventId)!==-1){
					$scope.users.push(data[i].userName)
				}
			}
	});

var userID = window.location.href.split('/')[5]
	$scope.eventsForUser =[];
	Events.getEvents()
	.then(function(data){
		for (var i = 0; i < data.length; i++) {
			if(data[i].users.indexOf(userID))
			$scope.eventsForUser.push(data[i].title)
		}
	})
});