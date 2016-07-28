angular.module('Khitwa.events', [])
.controller('EventsCtrl', function ($scope, Events,$location, Auth) {
	$scope.tab=1;
	$scope.filtText="";

            $scope.select=function(setTab){
                $scope.tab=setTab;
                if(setTab===1)
                   $scope.filtText=""
                if(setTab===2)
                   $scope.filtText="Education"
                if(setTab===3)
                    $scope.filtText="Medical"
                if(setTab===4)
                    $scope.filtText="Social"
            }
            $scope.isSelected=function(check){
                return ($scope.tab===check);
            }

	$scope.signout = function(){
		Auth.signout();
	}

	$scope.userId = window.userId;
	$scope.data={};
	Events.getEvents()
	.then(function(events){
		$scope.data.events = events;
	})
	.catch(function(error){
		console.error(error)
	})
});