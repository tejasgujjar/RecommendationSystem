'use strict';
angular.module("RecommendationSystem", [
  'ui.router',

  'ngMaterial',
  // 'ngAnimate',
 // 'ngCookies',
 // 'ngResource',
 // 'ngRoute',
 // 'ngSanitize',
 // 'ngTouch',
 'ngMessages'
])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/dashboard', '/dashboard/overview');
  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('base', {
      abstract: true,
      url: '',
      templateUrl: 'public/views/base.html'
    })
      .state('login', {
        url: '/login',
        parent: 'base',
        templateUrl: 'public/views/login.html',
        controller: 'LoginCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        parent: 'base',
        templateUrl: 'public/views/dashboard.html',
        controller: 'DashboardCtrl'
      })
        .state('overview', {
          url: '/overview',
          parent: 'dashboard',
          templateUrl: 'public/views/dashboard/overview.html'
        })
        .state('reports', {
          url: '/reports',
          parent: 'dashboard',
          templateUrl: 'public/views/dashboard/reports.html'
        });

})

.controller('DashboardCtrl', function($scope, $state) {

  $scope.$state = $state;

})

.controller('LoginCtrl', function($scope, $location) {

  $scope.submit = function() {

    $location.path('/dashboard');

    return false;
  }

});
// .config(function ($routeProvider) {
//
//   $routeProvider
//     .when('/', {
//       templateUrl: 'public/templates/home.template.ejs',
//       controller: 'HomeCtrl',
//       controllerAs: 'home.controller'
//     })
// });


console.log('loaded apps');
