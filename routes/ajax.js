var express = require('express');
var router = express.Router();
var UserLogin = require('./includes/UserLogin')


router.get('/', function (req, res) {

  if (req.query.cmd == "vlans") {
    UserLogin.queryDB(req.session.user, "select id, vlan_name from vlan",
      function (err, rows, fields) {
        res.send({ err: err, rows: rows, fields: fields })
      });
  }

  if (req.query.cmd == "sys_userliste") {
    UserLogin.queryDB(req.session.user, "select id, login, ADAccount,mail,enabled from satan_user order by login",
      function (err, rows, fields) {
        res.send({ err: err, rows: rows, fields: fields })
      });
  }



  //res.setHeader({ 'Content-Type': 'application/json' });
  //res.send({ 'cmd': req.query.cmd, 1: "eins", 2: "zwei" });

});

module.exports = router;
