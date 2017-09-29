var app = require('express')();
var http = require('http').Server(app);
var port = process.env.PORT || 8082;

http.listen(port, function () {
  console.log('listening on *:' + port);
});

var router = require('../router');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//add router
app.use(router);

var io = require('socket.io')(http)
var listener = require('../server/io.listener')
listener.init(io)
