
var mysql = require('mysql');
var AppConfig= require("../../AppConfig")

module.exports = {
  checkAuth: function (req, res, next) {
    if (!req.session.user_id) {
      //res.send('You are not authorized to view this page');
      res.redirect("/login")
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
        cb({user: "", threatId : ""})
        return;
      }
      cb({user: user, threatId : DB.threadId })
    })

  }

};

