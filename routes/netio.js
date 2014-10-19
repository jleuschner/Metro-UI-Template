var express = require('express');
var router = express.Router();

//var UserLogin = require('./includes/UserLogin')
//var AppConfig= require("../AppConfig")



router.get('/', function (req, res) {

  //UserLogin.initUser(req);
  //res.render('login', { AppConfig: AppConfig, user: req.session.user });
  res.render('netio/netio');

});

router.get("/DeviceList", function(req,res){
  var fields
  rows = new Array()
  rows.push({
      hostname : "pio01",
      ip : "192.168.0.51"  
    })
  rows.push({
      hostname : "pio00",
      ip : "192.168.0.91"  
    })
  res.send({ err: "", rows: rows, fields: fields })
})


module.exports = router;
