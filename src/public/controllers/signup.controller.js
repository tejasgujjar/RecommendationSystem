console.log('loaded controller signup');
angular.module("RecommendationSystem")

.controller("SignUpCtrl", function ($scope) {
      console.log('Signup controller testt controler');
      $scope.show_preferences = false;
      $scope.show_signup = true;

      $scope.done_signup = function(user){
        // if (user == undefined){
        //   show_error('Please fill out all the input blocks');
        //   return;
        // }
        // if (user != undefined && (user.firstname == undefined || user.lastname == undefined || user.email == undefined)){
        //   show_error('Please fill out all the input blocks');
        //   return;
        // }
        // else
        // commented above lines for development
        {
            // show preferences page
            console.log("show preference page");
            $scope.show_preferences = true;
            $scope.show_signup = false;

        }
      }

      $scope.login_user = function(preference){
        console.log('show log in screen');
        location.href = 'http://localhost:3000/#!/login';
        // save all user preferences to DB
        // show main page

      }
 });

function show_error(msg){
  alert(msg);
}
