var app = require('express')();
var http = require('http').Server(app);
var port = process.env.PORT || 8082;

http.listen(port, function(){
  console.log('listening on *:' + port);
});

var router = require('../router');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//add router
app.use(router);

var io = require('socket.io')(http)
var players = []
io.on('connection', function (socket) {
  socket.on('onReady', function (user) {
    var currentUser = players.find(x => x.name == user.name)
    if (currentUser) {
      currentUser.color = user.color
    } else if (players.length < 4) {
      players.push(user)
    }
    global.players = players
    io.emit('update', players)
  })

  socket.on('onCancel', function (user) {
    players = players.filter(x => x.name != user.name)
    global.players = players
    io.emit('update', players)
  })

  socket.on('gotoAC', function () {
    io.emit('gotoAC')
  })
})