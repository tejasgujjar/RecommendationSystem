console.log('loaded controller home');
angular.module("RecommendationSystem")

.controller('OverviewCtrl', function($scope, $location,$http) {

  console.log('showing RecommendationSystem');

  // $(".sidebar").hide();
  // setTimeout(function(){
  //   // $(".sidebar").show();
  // },3000);
  $scope.restaurants = [];
  $scope.$on('$stateChangeSuccess', function () {

		console.log("This page is loaded");
		   $http({
		      method: 'GET',
		      url: '/api/getRestaurantsForProfile'
			   }).then(function (success){
			   		console.log("Success");
			   		console.log(success.data);
			   		$scope.restaurants  = success.data;
			   },function (error){
			   		console.log("Failure");
				});
        var post_data = {
          "name": // session
          "category":"mexican" // session
          "latitude": //session
          "longitude": //session
        }

  });
});


/*{ _id: 58f7dfe22274676f9cb8e5e7,
  rating: 4,
  review_count: 295,
  name: 'Taqueria La Veracruzana',
  transactions: [ 'pickup' ],
  url: 'https://www.yelp.com/biz/taqueria-la-veracruzana-santa-clara?adjust_creative=6_COF2MISlqZFno5b_HZSA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=6_COF2MISlqZFno5b_HZSA',
  price: '$',
  distance: 1640.9854180239997,
  coordinates: { latitude: 37.35382, longitude: -121.94997 },
  phone: '+14082612108',
  image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/e0ckkDAznlkmNNAFPHlpIQ/o.jpg',
  categories: [ { alias: 'mexican', title: 'Mexican' } ],
  display_phone: '(408) 261-2108',
  id: 'taqueria-la-veracruzana-santa-clara',
  is_closed: false,
  location:
   { city: 'Santa Clara',
     display_address: [ '1510 Jackson St', 'Santa Clara, CA 95050' ],
     country: 'US',
     address2: '',
     address3: '',
     state: 'CA',
     address1: '1510 Jackson St',
     zip_code: '95050' } }*/
