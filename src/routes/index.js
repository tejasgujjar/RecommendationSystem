var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/signup', function(req, res, next) {
  console.log('Requested main page');
  res.render('signup', { title: 'Restaurant Recommendation System' });
});

module.exports = router;
