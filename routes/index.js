var express = require('express');
var router = express.Router();

var UserLogin = require('./includes/UserLogin')
var AppConfig= require("../AppConfig")

/* GET home page. */
if (AppConfig.login.required) {
  router.get('/', UserLogin.checkAuth, function(req, res) {
    res.render('index', { AppConfig : AppConfig, user: req.session.user });
  });
} else {
router.get('/', function (req, res) {
  UserLogin.initUser(req);
  res.render('index', { AppConfig: AppConfig, user: req.session.user });
});

}

router.get('/login', function(req, res) {
  UserLogin.initUser(req);
  res.render('login', { AppConfig: AppConfig, user: req.session.user });
});

router.post('/login', function (req, res) {
  UserLogin.initUser(req);
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
    //console.log(ret)
    req.session.user.DBCode = ret.DBCode
    if (ret.user) {
      //console.log("OK")
      req.session.user.id = ret.user;
      res.redirect('/');
    } else {
      //res.send('Bad user/pass');
      delete req.session.user.id;
      res.redirect('/')
    }
  })
  return;
});

router.get('/logout', function (req, res) {
  UserLogin.initUser(req);
  delete req.session.user.id;
  res.redirect('/');
});      

module.exports = router;
