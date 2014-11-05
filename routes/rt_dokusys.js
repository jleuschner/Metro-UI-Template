var express = require('express');
var router = express.Router();
var UserLogin = require('./includes/UserLogin')
var AppConfig= require("../AppConfig")

router.get('/', function (req, res) {
  res.render('dokusys/dokusys');
});

// Ajax
router.get('/getList', function (req, res) {
  UserLogin.queryDB(req.session.user, "select id, parent, topic,keywords from doc_topics order by parent,topic",
    function (err, rows, fields) {
      res.setHeader( 'Content-Type','application/json' );
      res.setHeader( 'charset','utf-8' );
      res.send({ err: err, rows: rows, fields: fields })
    });
});

router.get('/getTopic', function (req, res) {
  UserLogin.queryDB(req.session.user, "select id, parent, topic,keywords, topictext, dokustatus,user,time from doc_topics where id="+req.query.id,
    function (err, rows, fields) {
      res.setHeader( 'Content-Type','application/json' );
      res.setHeader( 'charset','utf-8' );
      res.send({ err: err, rows: rows, fields: fields })
    });
});


module.exports = router;
