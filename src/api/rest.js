var express = require('express');
var router = express.Router();
var restaurant = require('../schema/restaurantModel');
var restaurant_data = require('../schema/restaurantDataModel');
var user = require('../schema/userModel');
var NodeGeocoder = require('node-geocoder');
var mongoconn = require('../routes/mongodb');//mongo

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


router.get('/getRestaurantsByID',function(req,res){
  console.log("inside getRestaurantsByID");

  console.log(req.query.id);
  //var search_obj = JSON.parse(req.query.id);

  mongoconn.connect(function(_connection){
    
    var restaurants = _connection.collection('restaurants_dump');
    restaurants
    .find({"id":Number(req.query.id)})
    .toArray(function(err,result){
      if(err){
        console.log(err);
        res
        .status(200)
        .json({"status":"failed"});
      }
      var output = [];
      console.log(result.length);

      if(result.length != 0){
        output.push(result[0]);
      }

      res
      .status(200)
      .json(output);
    });

  });

});


router.get('/getRestaurantsForProfileTemp',function(req,res){
  console.log("inside getRestaurantsForProfileTemp");

  mongoconn.connect(function(_connection){
    
    var restaurants = _connection.collection('restaurants_dump');
    restaurants
    .find({"id":1})
    .toArray(function(err,result){
      if(err){
        console.log(err);
        res
        .status(200)
        .json({"status":"failed"});
      }
      var output = [];
      console.log(result.length);

      if(result.length != 0){
        output.push(result[0]);
      }

      res
      .status(200)
      .json(output);
    });

  });

});

router.get('/getRestaurantsForProfileNew',function(req,res){
	console.log("inside getRestaurants for the user");

	console.log(req.session.userDetails);

	res
        .status(200)
        .json({"status":"success"});

});

router.get('/getRestaurantsForProfile',function(req,res){
  console.log("inside getRestaurantsForProfile");
  //console.log(req.query);
  console.log("+==================================+++");

  restaurant_data.find({}, function (err, document) {
  		console.log(Object.keys(document).length);

		res.send(document);
	});

  mongoconn.connect(function(_connection){
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


});

//SignUp USER

router.post('/signupuser', function(req, res, next) {
    console.log("/signupuser");
    // console.log(req);

    var query_obj = req.body;
    console.log("query obj: "+query_obj.firstname);    user.findOne({ "user_email": query_obj.email}, function (err, document){

            if(err){

                console.log(err);
	            res.send({"status":409});
	            throw err;
        }

        if(document == null){

            var options = {
              provider: 'google',              // Optional depending on the providers
              httpAdapter: 'https', // Default
              apiKey: 'AIzaSyBya0eWeNGso4pQZZmjyApKOm2PnaU-P5w', // for Mapquest, OpenCage, Google Premier
              formatter: null         // 'gpx', 'string', ...
            };



            var geocoder = NodeGeocoder(options);
                 // Using callback
            geocoder.geocode(query_obj.streetname+" "+query_obj.city, function(err, result) {                var latitude="", longitude="";

                if(result.length){
                        latitude = result[0].latitude;
                        longitude = result[0].longitude;
                }


                var userInstance = new user({
                user_firstname: query_obj.firstname,
                user_lastname: query_obj.lastname,
                user_email: query_obj.email,
                user_password: query_obj.password,
                user_cuisine : query_obj.cuisines,
                user_streetName : query_obj.streetname,
                user_state : query_obj.state,
                user_city : query_obj.city,
                user_zipcode : query_obj.zipcode,
                user_country: query_obj.country,
                user_phone : query_obj.contactno,
                user_latitude: latitude,
                user_longitude: longitude
            });

                console.log("Instance: "+userInstance);

            	userInstance.save(function (err) {
                    if (err) {
                        res.send({"status":409});
                    } else {
                        console.log("I am here coz of success");
                        res.send({"status":200});
                    }
                });


             });

             }

            else{

                 console.log("user already exists");

                res.send({"status":409});
            }

    });
});


router.get('/signoutuser', function(req, res, next) {
	req.session.destroy();
	res.send({"status":200});
});

router.post('/signinuser', function(req, res, next) {
	console.log("Inside signin user");
	//console.log(req);
	var query_obj = req.body;
	console.log("query obj: "+query_obj.email);

	user.findOne({ "user_email": query_obj.email,"user_password":query_obj.password}, function (err, document){

		if(err){

			console.log(err);
			res.send({"status":409});
			throw err;
		}

		if(document == null){
			console.log("Invalid user");
			res.send({"status":409});
		}
		else{

			req.session.userDetails = document;
			console.log(req.session.userDetails);
			res.send({"status":200});
		}


	});

});
router.get('/getSuccess', function(req, res, next) {
	console.log("/getSuccess");

	setTimeout(function(){
		console.log("succsss");
		res.send({"status":200});
	},3000);
	res.send({"status":200});
});


router.get('/checkSession', function(req, res, next) {
	console.log("/checkSession");

	res.send({"msg":req.session});
});

router.get('/getSuccess', function(req, res, next) {
	console.log("/getSuccess");
	setTimeout(function(){
		console.log("succsss");
		res.send({"status":200});
	},3000);
});

router.get('/getuserDetails', function(req, res, next) {
	console.log("/getuserDetails new");

	res.send({"status":200,"userDetails":req.session.userDetails});
});


module.exports = router;
