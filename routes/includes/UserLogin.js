
var mysql = require('mysql');
var AppConfig= require("../../AppConfig")

module.exports = {
  initUser: function(req) {
    if (req.session.user === undefined) {
      req.session.user = { DBCode: "OK"}
      }
  },
  checkAuth: function (req, res, next) {
    if (req.session.user === undefined) {
      req.session.user = { DBCode: "OK" }
      }
    if (!req.session.user.id) {
      //res.send('You are not authorized to view this page');
      res.redirect("/login" )
    } else {
      next();
    }
  },
  connectDB: function (user,pass,cb) {
    var DB = mysql.createConnection({
      host: AppConfig.login.MySQLServer,
      user: user,
      password: pass
    })
    DB.connect(function (err) {
      if (err) {
        console.log(err)
        cb({user: "", threatId : "", DBCode : err.code})
        return;
      }
      cb({user: user, threatId : DB.threadId, DBCode : "OK" })
    })

  }

};

