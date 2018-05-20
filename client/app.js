var myApp = angular.module('myApp', ['ngRoute']);

// routes
myApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      controller: 'PostsController',
      templateUrl: 'views/posts.html'
    })
    .when('/posts', {
      controller: 'PostsController',
      templateUrl: 'views/posts.html'
    })
    .when('/posts/details/:id', {
      controller: 'PostsController',
      templateUrl: 'views/post_details.html'
    })
    .when('/posts/add', {
      controller: 'PostsController',
      templateUrl: 'views/add_post.html'
    })
    .when('/posts/edit/:id', {
      controller: 'PostsController',
      templateUrl: 'views/edit_post.html'
    })
    .otherwise({
      redirectTo: '/'
    });

  // use the HTML5 History API to remove hashbang #!
  $locationProvider.html5Mode(true);
});
