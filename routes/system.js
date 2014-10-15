var express = require('express');
var router = express.Router();

var UserLogin = require('./includes/UserLogin')
var AppConfig= require("../AppConfig")

router.get('/', function (req, res) {
  //UserLogin.initUser(req);
  //res.render('login', { AppConfig: AppConfig, user: req.session.user });
  res.render('system');

});



module.exports = router;
