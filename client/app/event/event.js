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
			$scope.showMap()
			})
		
		.catch(function (error) {
        console.error(error);
      });
	}
	$scope.showEvent();


$scope.showMap = function(){
	var event = $scope.event
	var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(event.positionLat, event.positionLng),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
  	$scope.map = new google.maps.Map(document.getElementById('eventMap'), mapOptions);


var infoWindow = new google.maps.InfoWindow();

    //var createMarker = function(event) {
      var marker = new google.maps.Marker({
        map: $scope.map,
        position: new google.maps.LatLng(event.positionLat, event.positionLng),
        title: event.title,
        address: event.location,
        animation: google.maps.Animation.DROP,
        eventDate: event.startDate
      });
      marker.content = '<div class="infoWindowContent">'+ event.title +'<br>'+ event.location +'<br>' +'</div>';

      //google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
        infoWindow.open($scope.map, marker);
      //});

    }
    $scope.openInfoWindow = function(e, selectedMarker) {
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
    }



//}




/*Map*/
	// --------------------------------------------------------

//console.log(Events)











  	/*if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            $scope.event.eventLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          }); 
        } else {
          // Browser doesn't support Geolocation
          alert('your browser does not support the geolocation');
        }
*/
	// --------------------------------------------------
/*
var infoWindow = new google.maps.InfoWindow();

    var createMarker = function(order) {
      var marker = new google.maps.Marker({
        map: $scope.map,
        position: new google.maps.LatLng(order.userLocation.lat, order.userLocation.lng),
        user: order.fullName,
        address: order.address,
        phoneNumber: order.phoneNumber,
        quantity: order.quantity,
        orderDate: order.orderDate
      });
      marker.content = '<div class="infoWindowContent">'+ order.fullName +'<br>'+ order.address +'<br>'+ order.phoneNumber +'</div>';

      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent('<h2>' + marker.user + '</h2>' + marker.content);
        infoWindow.open($scope.map, marker);
      });
      // if marker 
      $scope.markers.push(marker);

    }
    $scope.openInfoWindow = function(e, selectedMarker) {
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
    }


*/



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