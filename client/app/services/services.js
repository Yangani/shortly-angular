angular.module('shortly.services', [])

.factory('Links', function ($http) {
  var getLinks = function () {
    return $http({
      method: 'GET',
      url: '/api/links'
    })
    .then(function (urls) {
      return resp.urls.data;
      console.log("THis is too much: ", urls.data)
    });

  // var shortenLink = function (url) {
  //   return $http({
  //     method: 'GET',
  //     url: '/api/links',
  //     data: url
  //   })
  //   .then(function (urls) {
  //     return resp.data;
  //     console.log("THis is too much: ", urls.data)
  //   });

    return {
      getLinks: getLinks,
      shortenLink: shortenLink
    }
}
})

.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
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
