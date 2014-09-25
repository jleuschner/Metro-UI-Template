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
  /*
  if (post.login === 'jens' && post.password === 'jens') {
  req.session.user_id = post.login;
  res.redirect('/');
  } else {
  //res.send('Bad user/pass');
  res.redirect('/')
  }
  */
  UserLogin.connectDB(post.login,post.password,function (ret) {
    console.log(ret)
    if (ret.user) {
      console.log("OK")
      req.session.user_id = ret.user;
      res.redirect('/');
    } else {
      //res.send('Bad user/pass');
      delete req.session.user_id;
      res.redirect('/')
    }
  })
  return;
});

router.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/');
});      

module.exports = router;
