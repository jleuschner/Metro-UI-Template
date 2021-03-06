
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
    if (!req.session.user.user) {
      //res.send('You are not authorized to view this page');
      res.redirect("/login" )
    } else {
      next();
    }
  },
  connectDB: function (user,pass,cb) {
    var DB = mysql.createConnection({
      host: AppConfig.login.MySQLServer,
      database: AppConfig.login.MySQLDatabase,
      user: user,
      password: pass
    })
    DB.connect(function (err) {
      if (err) {
        console.log(err)
        cb({user: "", threatId : "", DBCode : err.code})
        return;
      }
      cb({user: user, threatId : DB.threadId, DBCode : "OK", DBconnection : DB })
    })
  },
  queryDB: function(session,qry,cb) {
    if (!session) {
      console.log("NOSESS")
      if (cb) cb("NOSESSION")
      return
    }
    this.connectDB(session.user,session.pass, function(userDB){
      if (userDB.DBCode!="OK") {
        console.log("ERR: "+userDB.DBCode)
        if (cb) cb(userDB.DBCode)
        return
      }
      userDB.DBconnection.query(qry, function (err, rows, fields) {
          if ( err) {
            console.log(err)
          }
          if (cb) cb (err,rows,fields)
        })
    })
  }

};

