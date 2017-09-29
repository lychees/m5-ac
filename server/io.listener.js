var Player = require('./entity/player')
var util = require('./util')

var init = function (io) {
    var players = []
    io.on('connection', function (socket) {
        socket.on('onReady', function (user) {
            var currentPlayer = players.find(x => x.Name == user.name)
            if (currentPlayer) {
                currentPlayer.color = user.color
            } else if (players.length < 4) {
                players.push(new Player(user.name, user.color))
            }
            global.players = players
            io.emit('room-update', players)
        })

        socket.on('onCancel', function (name) {
            players = players.filter(x => x.name != name)
            global.players = players
            io.emit('room-update', players)
        })

        socket.on('gotoAC', function () {
            io.emit('gotoAC')
        })

        socket.on('onDice', function (name) {
            var diceNumber = util.getRandomNum(1, 6)
            var player = players.find(x => x.Name == name)
            if (player.Positions.find(x => x >= 0)) {
                io.emit('dice-update', { name: name, number: diceNumber })
            } else {
                if (diceNumber < 5) {
                    io.emit('dice-update', { name: name, number: diceNumber })
                    io.emit('position-update', {
                        name: name,
                        color: player.Color,
                        chess_numbers: [diceNumber],
                        position_from: -1,
                        position_to: 0,
                        outHome: true,
                        nextDiceColor: util.getNextColor(player.Color)
                    })
                } else {
                    //dice 5 or 6 before out home
                    //get card

                    //next one
                    io.emit('dice-update-animation', { name: name, number: diceNumber, nextDiceColor: util.getNextColor(player.Color) })
                }
            }
        })

        var stepNumber = 0
        socket.on('onMove', function (req) {
            var { name, chess_number, flow_position_from, diceNumber, byClick } = req
            var color = players.find(x => x.Name == name).Color
            var flow_position_to = flow_position_from + 1

            var playerPosition = players.find(x => x.Name == name).Positions
            var chess_numbers_on_this_position = []
            playerPosition.forEach((x, index) => {
                if (x == playerPosition[chess_number - 1]) {
                    chess_numbers_on_this_position.push(index + 1)
                }
            })
            //check if moving out home
            if (byClick && playerPosition[chess_number - 1] == -1) {
                var outHome = true
            }
            //test data
            io.emit('position-update', {
                name: name,
                color: color,
                chess_numbers: chess_numbers_on_this_position,
                position_from: flow_position_from,
                position_to: flow_position_to,
                moveNext: true,
                outHome: outHome,
                nextDiceColor: util.getNextColor(color)
            })
            return

            io.emit('position-update', { name: name, color: color, chess_numbers: chess_numbers_on_this_position, position_from: flow_position_from, position_to: flow_position_to, moveNext: true })

            if (stepNumber == diceNumber) {
                stepNumber = 0
                //jump logic
                flow_position_to += 5
                //strike other player's chess
                for (let otherPlayer of players) {
                    if (otherPlayer.name != name) {
                        var otherCount = otherPlayer.Positions.filter(x => x == flow_position_to).length
                        //find other player's chess on the position
                        if (otherCount > 0) {
                            if (playerPosition.filter(x => x == playerPosition[chess_number - 1]).length >= otherCount) {
                                //others back home :)
                                //1.update to this position in memory and ui
                                chess_numbers_on_this_position.forEach(x => platyerPosition[x - 1] = flow_position_to)
                                io.emit('position-update', { name: name, chess_numbers: chess_numbers_on_this_position, position_from: flow_position_from, position_to: flow_position_to })
                                //2.strike other player on this position
                            } else {
                                //you home :(
                                chess_numbers_on_this_position.forEach(x => {
                                    io.emit('position-update', { name: name, chess_numbers: chess_numbers_on_this_position, position_from: flow_position_from, position_to: -1 })
                                })
                            }
                        }
                    }
                }
                //1.your chess number >= other's, you win
                playerPosition[chess_number - 1] = flow_position_to
                io.emit('position-update', { name: name, chess_numbers: [chess_number], position_from: flow_position_from, position_to: flow_position_to })
                io.emit('position-update', { name: name, chess_numbers: [chess_number], position_from: flow_position_from, position_to: flow_position_to })
            } else {
                stepNumber++
            }
        })
    }).catch(err => {
        console.error(err)
    })
}

module.exports = {
    init: init
}