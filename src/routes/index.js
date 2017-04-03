var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/signup', function(req, res, next) {
  console.log('Requested signup page');
  res.render('signup', { title: 'Restaurant Recommendation System' });
});

router.get('/', function(req, res, next) {
  console.log('Requested home page');
  res.render('home', { title: 'Restaurant Recommendation System' });
});

module.exports = router;
