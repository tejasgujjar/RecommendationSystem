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
 'ngMessages',
 'ngRateIt'
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
          templateUrl: 'public/views/dashboard/overview.html',
          controller: 'OverviewCtrl'

        })
        .state('reports', {
          url: '/reports',
          parent: 'dashboard',
          templateUrl: 'public/views/dashboard/reports.html'
        })
        .state('userprofile', {
          url: '/userprofile',
          parent: 'dashboard',
          templateUrl: 'public/views/dashboard/userprofile.html'
        })
        .state('settings', {
          url: '/settings',
          parent: 'dashboard',
          templateUrl: 'public/views/dashboard/settings.html'
        });

})

.controller('DashboardCtrl', function($scope, $state) {
  $scope.$state = $state;
});



console.log('loaded apps');
