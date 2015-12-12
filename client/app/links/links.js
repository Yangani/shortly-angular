angular.module('shortly.links', [])

.controller('LinksController', function ($scope, $http, Links, Auth, $location) {
  $scope.username = localStorage.getItem('username');

  $scope.data = {};

  $scope.getLinks = function() {
    Links.fetchLinks().then(function(links) {
      $scope.data.links = links;
    });
  };
  $scope.getLinks();

  $scope.link = {};

  $scope.addLink = function() {
      var url = {};
      url.url = $scope.url;
      $scope.url = '';
      Links.shortenLink(url).then(function() {
        Links.fetchLinks().then(function(links) {
          $scope.data.links = links;
        });
      });
    };

  $scope.signout = function() {
    Auth.signout();
  };
});
