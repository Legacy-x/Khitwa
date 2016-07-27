angular.module('Khitwa.FB', ['djds4rce.angular-socialshare'])

.run(function($FB){
  $FB.init('386469651480295');
})

.controller('fbShare', function ($scope,$timeout) {
	$timeout (function(){
		$scope.url = 'http://google.com';
		$scope.text = 'testing share';
		$scope.title = 'Title1'
	}, 1000)

	$timeout (function(){
		$scope.url = 'http://www.youtube.com/watch?v=wxkdilIURrU';
		$scope.text = 'testing share';
		$scope.title = 'Title2'
	}, 1000)

	$scope.callback = function (response){
		console.log(response);
		alert ('Share callback');
	}

});



/*
angular.module('testing',['djds4rce.angular-socialshare'])

angular.module('testing').controller('temp',function($scope,$timeout){

  $timeout(function(){
    $scope.url = 'http://google.com';
    $scope.text = 'testing share';
    $scope.title = 'title1'
  },1000)
  $timeout(function(){
    $scope.url = 'https://www.youtube.com/watch?v=wxkdilIURrU';
    $scope.text = 'testing second share';
    $scope.title = 'title2';
  },1000)

  $scope.callback = function(response){
    console.log(response);
    alert('share callback');
  }
}); */