var express = require('express');
var router = express.Router();
var mongoconn = require('./mongodb');//mongo

/* GET home page. */
router.get('/signup', function(req, res, next) {
  console.log('Requested signup page');
  res.render('signup', { title: 'Restaurant Recommendation System' });
});

router.post('/api/signup', function(req, res) {
  console.log('Requested signup data node');
  mongoconn.connect(function(_connection){

  		//console.log("OHhhhhhhhhhhhhhhhh",_connection);
  		var userdata = _connection.collection('userdata');
      userdata.insert({"email":'testemail',"password":'pass',"firstname":'tejas'});

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
  res.render('home', { title: 'Restaurant Recommendation System' });
});

module.exports = router;
