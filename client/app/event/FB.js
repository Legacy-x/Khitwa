if (window.location.href.indexOf('http') != 0) {
    alert("This demo must be run on a web server (i.e. the url must start with http/https), it won't work by opening the file directly in a browser.");
}

angular.module('Khitwa.FB', ['angulike'])
  .run([
      '$rootScope', function ($rootScope) {
          $rootScope.facebookAppId = '[FacebookAppId]'; // set your facebook app id here
      }
  ]);

angular.module('Khitwa.FB')
  .controller('myController', [
      '$scope', function ($scope) {
          $scope.myModel = {
              Url: 'https://www.facebook.com/AppStore/',
              Name: "test apple store site", 
              ImageUrl: 'http://static1.squarespace.com/static/5294edb1e4b0e7c53c010373/t/541906cfe4b09ea85f76e0c0/1410926287561/Apple+Store'
          };
      }
  ]);