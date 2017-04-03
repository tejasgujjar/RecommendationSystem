'use strict';
angular.module("RecommendationSystem", [
  'ngMaterial',
  // 'ngAnimate',
 // 'ngCookies',
 // 'ngResource',
 'ngRoute',
 // 'ngSanitize',
 // 'ngTouch',
 'ngMessages'
])
.config(function ($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'public/templates/signup.template.ejs',
      controller: 'SignUpCtrl',
      controllerAs: 'signup.controller'
    })
});
// .controller("SignUpCtrl", function ($scope) {
//      console.log('Signup controller testt');
//
// });

console.log('loaded apps');
