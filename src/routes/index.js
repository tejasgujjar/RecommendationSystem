var express = require('express');
var router = express.Router();
var mongoconn = require('./mongodb');//mongo
var geolib = require('geolib');

/* GET home page. */

router.get('/signup', function(req, res, next) {
  console.log('Requested signup page');
  res.render('signup', { title: 'Restaurant Recommendation System' });
});
router.get('/new-ui', function(req, res, next) {
  console.log('Requested new landing page');
  res.render('index', { title: 'Restaurant Recommendation System' });
});
router.get('/home', function(req, res, next) {
  console.log('Requested home page');
  res.render('home-new', { title: 'Restaurant Recommendation System' });
});
router.get('/new', function(req, res, next) {
  console.log('Requested new sign in page');
  res.render('new_signin', { title: 'Restaurant Recommendation System' });
});

router.post('/api/signup', function(req, res) {
  console.log('---------------------------------------------------\n'); //please maintain this order while logging
  console.log('Request email comming in ' +req.body.email);
  console.log('Request password comming in ' +req.body.password);
  console.log('Request firstname comming in ' +req.body.firstname);
  console.log('Request lastname comming in ' +req.body.lastname);
  console.log('Request streetName comming in ' +req.body.streetName);
  console.log('Request zipcode comming in ' +req.body.zipcode);
  console.log('Request cuisine comming in ' +req.body.cuisine);
  console.log('Request state comming in ' +req.body.state);
  console.log('Request contactnumber comming in ' +req.body.contactnumber);
  console.log('---------------------------------------------------\n'); //please maintain this order while logging
  mongoconn.connect(function(_connection){
    var userdata = _connection.collection('userdata');
    userdata.insert({
      "email":req.body.email,
      "password":req.body.password,
      "firstname":req.body.firstname,
      'lastname':req.body.lastname,
      "streetName": req.body.streetName,
      "zipcode": req.body.zipcode,
      "cuisine":req.body.cuisine,
      "state":req.body.state,
      "contactnumber":req.body.contactnumber
  });
    console.log('Got result from DB');
    result = {"condition":"success"};
    console.log('Going to release DB connection to the Pool');
    res
    .status(200)
    .json(result);
    return;
  });
});

router.get('/', function(req, res, next) {
  console.log('Requested home page');
  res.render('index', { title: 'Restaurant Recommendation System' });
});

router.post('/api/postReview', function(req, res, next) {
  console.log("inside /api/postReview");

  mongoconn.connect(function(_connection){

    var restaurants = _connection.collection('restaurants_dump');
    var user_reviews = _connection.collection('user_reviews_test');
    var query_obj = req.body;

    console.log(query_obj);
    restaurants.update(
       {"id":Number(query_obj.restaurant_id)},
       { "$push": {"review":{"userid":req.session.userDetails.user_id+"","username":req.session.userDetails.user_firstname,"restid":query_obj.restaurant_id,"ratings":query_obj.rating,"comment":query_obj.review_msg}}
    },function(err,doc){


      if(err){
        console.log(err);
        res
        .status(400)
        .json({"status":400});
      }

      console.log(doc);



      user_reviews.insert(
       {"userid":req.session.userDetails.user_id+"","restid":query_obj.restaurant_id,"ratings":query_obj.rating,"comment":query_obj.review_msg},

    function(err2,doc2){


      if(err2){
        console.log(err2);
        res
        .status(400)
        .json({"status":400});
      }

      console.log(doc2);

    res
        .status(200)
        .json({"status":200});

    });


    });




  });

/*db.collection.update(
    { "_id": "efgh" },
    { "$push": { "myArray": { "field1": "abc", "field2": "def" } }
)*/


});

router.get('/getRestaurantsForProfileNew',function(req,res){
  console.log("inside getRestaurants for the user");

  console.log(req.session.userDetails);

  res
        .status(200)
        .json({"status":"success"});

});


router.get('/getRestaurantsForProfileTemp',function(req,res){
  console.log("inside getRestaurantsForProfileTemp");

  mongoconn.connect(function(_connection){

    var restaurants = _connection.collection('restaurants');
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
        output.push(result[index]);
      }

      res
      .status(200)
      .json(output);
    });

  });

});





router.get('/api/getRestaurantsForProfile',function(req,res){
  console.log("inside getRestaurantsForProfile new");

  console.log(req.session.userDetails);

  //if(req.session.userDetails.user_id == 17){
    console.log("Get restaurants for user 17");

    mongoconn.connect(function(_connection){


        if(req.session.userDetails.user_id == 29) {
         var arr = [2,11,36,45,65,114,139,168,170,176,195,207,227,247,263]; //mexican
       } else if (req.session.userDetails.user_id == 31) {
         var arr = [44,46,49,50,77,78,80,107,117,118,120,121,124,125,126,137];
       } else {
         var arr = [12,14,33,35,75,109];
       }


        var restaurants = _connection.collection('restaurants_dump');
        restaurants
        .find({"id":{"$in":arr}})
        .sort({"rating":-1})
        .toArray(function(err,result){

        if(err){
                console.log(err);
                res
                .status(200)
              .json({"status":"failed"});
        }
        var output = [];
          for(var index in result){
            console.log(result[index].rating);
            result[index].rating = Math.ceil(result[index].rating*10)/10;
            output.push(result[index]);            
          }

          res
      .status(200)
      .json(output);

        });


    });




  /*mongoconn.connect(function(_connection){
    //lat = 37.3412530
    //long = -121.8949750
    //http://localhost:3000/api/getRestaurantsForProfile?name=yashas&category=mexican&latitude=37.3412530&longitude=-121.8949750
    var restaurants = _connection.collection('restaurants_dump');
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
        var count = 0;
        for(var index in result){
          output.push(result[index]);
          count++;
          if(count == 20) break;
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
