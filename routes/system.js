var express = require('express');
var router = express.Router();
var UserLogin = require('./includes/UserLogin')
var AppConfig= require("../AppConfig")

router.get('/', function (req, res) {
  res.render('system/system');
});

router.get('/user', function (req, res) {
  res.render('system/user');
});

// Ajax
router.get('/user/getList', function (req, res) {
  UserLogin.queryDB(req.session.user, "select id, login, ADAccount,mail,enabled from satan_user order by login",
    function (err, rows, fields) {
      res.send({ err: err, rows: rows, fields: fields })
    });
});


module.exports = router;
