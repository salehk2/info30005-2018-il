var myApp = angular.module('myApp');

// array passed to be suitable for minified angular version
// optimize this with promises

myApp.controller('PostsController', ['$scope', '$http', '$location', '$routeParams',
  function ($scope, $http, $location, $routeParams) {
    $scope.getPosts = function () {
      $http.get('/api/posts')
        .then(function onSuccess (response) {
          $scope.posts = response.data;
        });
    };

    $scope.getPost = function () {
      $http.get('/api/posts/' + $routeParams.id)
        .then(function onSuccess (response) {
          $scope.post = response.data;
        });
    };

    $scope.addPost = function () {
      $http.post('/api/posts/', $scope.post)
        .then(function onSuccess (response) {
          window.location.href = '/';
        });
    };

    $scope.updatePost = function () {
      $http.put('/api/posts/' + $routeParams.id, $scope.post)
        .then(function onSuccess (response) {
          window.location.href = '/';
        });
    };

    $scope.removePost = function (id) {
      $http.delete('/api/posts/' + id)
        .then(function onSuccess (response) {
          window.location.href = '/';
        });
    };
  }
]);
