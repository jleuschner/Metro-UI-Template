var express = require('express');
var router = express.Router();
var UserLogin = require('./includes/UserLogin')
var AppConfig= require("../AppConfig")

router.get('/', function (req, res) {
  res.render('dokusys/dokusys');
});

// Ajax
router.get('/getList', function (req, res) {
  UserLogin.queryDB(req.session.user, "select id, parent, topic,keywords from doc_topics order by id",
    function (err, rows, fields) {
      res.send({ err: err, rows: rows, fields: fields })
    });
});


module.exports = router;
