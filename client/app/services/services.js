angular.module('shortly.services', [])

.factory('Links', function ($http) {

  var fetchLinks = function() {
    return $http({
      method: 'GET',
      url: '/api/links'
    })
    .then(function(resp){
      return resp.data;
    });
  };

 var shortenLink = function(url){
    return $http({
      method: 'POST',
      url: '/api/links',
      data: url
    })
    .then(function(resp){
      console.log('Successfully posted link!', resp);
    });
  };

  return {
    fetchLinks : fetchLinks,
    shortenLink : shortenLink
  };
})
.factory('Auth', function ($http, $location, $window) {
  // Authenticating user by exchanging the user's username and password
  // for a JWT from the server that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    console.log("In signout function");
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
