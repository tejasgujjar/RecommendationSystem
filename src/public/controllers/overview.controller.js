console.log('loaded controller home');
angular.module("RecommendationSystem")

.controller('OverviewCtrl', function($scope, $location) {

  console.log('showing RecommendationSystem');
  $scope.print = 'loading from controller';
});
