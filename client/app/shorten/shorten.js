angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $http, $location, Links) {
  
  $scope.link = {};

  $scope.addLink = function() {
    var url = {};
    url.url = $scope.url;
    Links.shortenLink(url);
  };

});
