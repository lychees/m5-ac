var express = require('express')
var router = express.Router()
var core = require('./core')
var url = require('./url')
var http = require('http')
var io = require('socket.io')(http)
var players = []

for (prop in url) {
    router.post(url[prop], core[prop])
}

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg)
    })
})

module.exports = router;