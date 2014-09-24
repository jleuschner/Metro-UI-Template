var express = require('express');
var router = express.Router();

var UserLogin = require('./includes/UserLogin')

/* GET home page. */
router.get('/', UserLogin.checkAuth, function(req, res) {
  //console.log(req)
  res.render('index', { title: 'Metro' });
});

router.get('/login', function(req, res) {
  //console.log(req)
  res.render('login', { title: 'Metro Login Page' });
});

router.post('/login', function (req, res) {
  var post = req.body;
  console.log(post.login)
  console.log(post.password)
  if (post.login === 'jens' && post.password === 'mausi') {
    req.session.user_id = post.login;
    res.redirect('/');
  } else {
    //res.send('Bad user/pass');
    res.redirect('/')
  }
});

router.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/login');
});      

module.exports = router;
