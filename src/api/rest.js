var express = require('express');
var router = express.Router();
var restaurant = require('../schema/restaurantModel');
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

module.exports = router;




