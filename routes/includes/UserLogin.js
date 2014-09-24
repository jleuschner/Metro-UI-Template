

module.exports = {
    checkAuth : function(req, res, next) {
      if (!req.session.user_id) {
        //res.send('You are not authorized to view this page');
        res.redirect("/login")
      } else {
        next();
      }
    }

};

