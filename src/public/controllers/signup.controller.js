console.log('loaded controller signup');
angular.module("RecommendationSystem")

.controller("SignUpCtrl", function ($scope, $http) {
  console.log('Signup controller testt controler');
  $scope.show_preferences = false;
  $scope.show_signup = true;
  $scope.state = "CA";
  $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS '
    ).split(' ').map(function(state) {
        return {abbrev: state};
      });
  $scope.cuisine = "American";
   $scope.cuisines = ('Indian Mexican American Thai'
    ).split(' ').map(function(cuisine) {
        return {favCuisine: cuisine};
      });
  $scope.done_signup = function(user){
      console.log($scope.state);
       $scope.show_preferences = true;
       $scope.show_signup = false;
}




    $scope.login_user = function(preference){
        console.log('show log in screen' );
       // location.href = 'http://localhost:3000/#!/login';
       
    //"state":$scope.state,
              var dataval = {
                  "email":$scope.emailsign,
                  "password":$scope.passwordsign,
                  "firstname":$scope.firstname,
                  "lastname":$scope.lastname,
                  "streetName":$scope.streetName,
                  "zipcode":$scope.zipcode,
                  "cuisine":$scope.cuisine,
                  "state":$scope.state,
                  "contactnumber":$scope.contactnumber
              };
              console.log($scope.zipcode);
              console.log($scope.cuisine);
              console.log($scope.state);
              console.log($scope.contactnumber);

              console.log($scope.emailsign);
              console.log($scope.passwordsign);
              console.log($scope.firstname);
              console.log($scope.lastname);
              console.log($scope.streetName);
              
              $http({
              method : "POST",
              url : '/api/signup',
              data : dataval
            }).success(function(data) {
              console.log("signed up: "+data);
              location.href = 'http://localhost:3000/#!/dashboard/overview';
            }).error(function(error) {
              console.log("Error up: "+error);
          });
            
        }
    });

function show_error(msg){
  alert(msg);
}
