var express = require('express');
var router = express.Router();

var UserLogin = require('./includes/UserLogin')
var AppConfig= require("../AppConfig")


/* GET home page. */
if (AppConfig.login.required) {
  router.get('/', UserLogin.checkAuth, function(req, res) {
    res.render('index', { AppConfig : AppConfig, user: { id: req.session.user_id} });
  });
} else {
  router.get('/', function (req, res) {
    res.render('index', { AppConfig : AppConfig, user: { id: req.session.user_id} });
  });

}

router.get('/login', function(req, res) {
  res.render('login', { AppConfig: AppConfig });
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
  res.redirect('/');
});      

module.exports = router;
