var express = require('express');
var router = express.Router();

var net = require('net');


//var UserLogin = require('./includes/UserLogin')
//var AppConfig= require("../AppConfig")



router.get('/', function (req, res) {

  //UserLogin.initUser(req);
  //res.render('login', { AppConfig: AppConfig, user: req.session.user });
  res.render('netio/netio');

});

router.get('/tiles', function (req, res) {
  res.render('netio/tiles');
});



router.get("/DeviceList", function(req,res){
  var fields
  rows = new Array()
  rows.push({
      hostname : "netio-wozi1",
      ip : "192.168.0.70"  
    })
  rows.push({
      hostname : "pio01",
      ip : "192.168.0.71"  
    })
  rows.push({
      hostname : "pio00",
      ip : "192.168.0.91"  
    })
  res.send({ err: "", rows: rows, fields: fields })
})

router.get("/send", function (req, res) {
  console.log(req.query.mood)
  switch (req.query.mood) {
    case '0': 
      netio_send("channel 2 0");
      netio_send("channel 3 0");
      netio_send("channel 4 0");
      break;
    case '1': 
      netio_send("channel 2 255");
      netio_send("channel 3 50");
      netio_send("channel 4 200");
      break;
  }
  res.send({ err: "" })
})

function netio_send(cmd) {
  var client = new net.Socket();
  client.on('data', function(data) {
	  console.log('Received: ' + data);
	  client.destroy(); // kill client after server's response
  });
 
  client.on('close', function() {
	  console.log('Connection closed');
  });

	client.connect(2701, '192.168.0.70', function() {
		console.log('Connected');
		client.write(cmd+"\n");
	});
}

module.exports = router;
