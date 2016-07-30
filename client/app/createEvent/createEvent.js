angular.module('Khitwa.createEvent', [])
//user can create event
.controller('CreateEventCtrl', function ($scope, $location, Events, Auth) {
	$scope.signout = function(){
		Auth.signout();
	}
	$scope.event={};
	$scope.addEvent = function () {
		Events.createEvent($scope.event)
		.then(function () {
			$location.path('/event');
		})
		.catch(function (error) {
			console.error(error)
		})
	}

if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            $scope.event.positionLat= position.coords.latitude;
            $scope.event.positionLng= position.coords.longitude; 
          }); 
        } else {
          // Browser doesn't support Geolocation
          alert('your browser dos not support the geolocation');
        }









});