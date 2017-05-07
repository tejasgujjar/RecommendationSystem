var express = require('express');
var router = express.Router();
var restaurant = require('../schema/restaurantModel');
var restaurant_data = require('../schema/restaurantDataModel');
var user = require('../schema/userModel');

//RESTAURANT RELATED DATABASE CALLS

//INSERT RESTAURANT
router.get('/insertRest', function(req, res, next) {
	console.log("/insertRest");

	var restaurantInstance = new restaurant({
		rest_name: "Smokin Joes",
		rest_cuisine: "India",
		rest_lat: "31.3382",
		rest_lng: "118.8863"
	});

	restaurantInstance.save(function (err) {
		if (err) {
			res.send("error");
		} else {
			res.send("success");
		}
	});

});

//GET ALL RESTAURANT
router.get('/getAllRest', function(req, res, next) {
	console.log("/getAllRest");	
	restaurant.find({}, function (err, document) {
		res.send(document);
	});
});

//GET ONE RESTAURANT
router.get('/getRest', function(req, res, next) {
	console.log("/getRest");	
	restaurant.findOne({ rest_name: "Smokin Joes"}, function (err, document){
		if(err){
			console.log(err);
			throw err;
		}
		res.send(document);
	});
});

//USER RELATED DATABASE CALLS

//INSERT USER
router.get('/insertUser', function(req, res, next) {
	console.log("/insertUser");

	var userInstance = new user({
		user_firstname: "Tejas",
		user_lastname: "Gujjar",
		user_email: "tejas@gmail.com",
		user_cuisine : "Mexican",
		user_streetName : "329 North First",
		user_state : "CA",
		user_zipcode : "95110",
		user_phone : "836638290"
	});

	userInstance.save(function (err) {
		if (err) {
			res.send("error");
		} else {
			res.send("success");
		}
	});

});

//GET ALL USERS
router.get('/getUsers', function(req, res, next) {
	console.log("/getUsers");	
	user.find({}, function (err, document) {
		res.send(document);
	});
});

//GET ONE USER
router.get('/getUser', function(req, res, next) {
	console.log("/getUser");	
	user.findOne({ user_firstname: "Tejas"}, function (err, document){
		if(err){
			console.log(err);
			throw err;
		}
		res.send(document);
	});
});


router.get('/getRestaurantsForProfile',function(req,res){
  console.log("inside getRestaurantsForProfile");
  //console.log(req.query);
  console.log("+==================================+++");

  restaurant_data.find({}, function (err, document) {
  		console.log(Object.keys(document).length);

		res.send(document);
	});

  /*mongoconn.connect(function(_connection){
    //lat = 37.3412530
    //long = -121.8949750
    //http://localhost:3000/api/getRestaurantsForProfile?name=yashas&category=mexican&latitude=37.3412530&longitude=-121.8949750
    var restaurants = _connection.collection('restaurants');
    restaurants
    .find()
    .toArray(function(err,result){
      if(err){
        console.log(err);
        res
        .status(200)
        .json({"status":"failed"});
      }
      var output = [];
      console.log(result.length);

      var range = 16100; //10 miles
      if(result.length != 0){
        for(var index in result){

          for (var objIndex in result[index].categories){
            if(result[index].categories[objIndex]['alias'] == req.query['category']){

              var dist = geolib.getDistance(
                //{latitude: Number(req.query['latitude']), longitude: Number(req.query['longitude'])},
                {latitude: Number(37.3412530), longitude: Number(-121.8949750)}, //should replace  with session data
                {latitude: Number(result[index].coordinates['latitude']), longitude: Number(result[index].coordinates['longitude'])}
                );
              console.log("Distance is:"+dist);
              if(dist <= range){
                console.log(result[index]);
                output.push(result[index]);
                console.log("Within range...........");
              }
              break;
            }
          }

        }


      }


      res
      .status(200)
      .json(output);
    });

  });
*/

});


module.exports = router;




