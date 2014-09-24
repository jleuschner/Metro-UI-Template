var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //console.log(req)
  res.render('index', { title: 'Metro' });
});

router.get('/login', function(req, res) {
  //console.log(req)
  res.render('login', { title: 'Metro' });
});

module.exports = router;
