console.log('loaded controller home');
angular.module("RecommendationSystem")

.controller('LoginCtrl', function($scope, $location) {

  $scope.login = function() {
    console.log('clocked login');
    $location.path('/dashboard');

    return false;
  }
  $scope.signup = function() {
    console.log('clocked signup');
    location.href = 'http://localhost:3000/signup';
    // $location.path('/dashboard');

    return false;
  }

});
