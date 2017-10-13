var Player = require('./entity/player')
var util = require('./util')

var init = function (io) {
    global.ac = { players: [] }
    try {
        io.on('connection', function (socket) {
            socket.on('onReady', function (user) {
                var currentPlayer = global.ac.players.find(x => x.Name == user.name)
                if (currentPlayer) {
                    currentPlayer.color = user.color
                } else if (global.ac.players.length < 4) {
                    global.ac.players.push(new Player(user.name, user.color))
                }
                io.emit('room-update', global.ac.players)
            })

            socket.on('onCancel', function (name) {
                global.ac.players = global.ac.players.filter(x => x.name != name)
                io.emit('room-update', global.ac.players)
            })

            socket.on('gotoAC', function () {
                io.emit('gotoAC')
            })

            socket.on('onDice', function (name) {
                global.ac.started = true
                var diceNumber = util.getRandomNum(1, 6)
                global.ac.diceNumber = diceNumber
                var player = global.ac.players.find(x => x.Name == name)
                if (player.Positions.filter(x => x >= 0).length > 0) {
                    io.emit('dice-update', { name: name, number: diceNumber })
                } else {
                    if (diceNumber < 5) {
                        io.emit('dice-update', { name: name, number: diceNumber })

                        player.Positions[diceNumber - 1] = 0
                        io.emit('position-update', {
                            name: name,
                            color: player.Color,
                            chess_numbers: [diceNumber],
                            position_from: -1,
                            position_to: 0,
                            outHome: true,
                            nextDiceColor: util.getNextColor(player.Color)
                        })

                        global.ac.diceColor = util.getNextColor(player.Color)
                    } else {
                        //dice 5 or 6 before out home
                        //get card

                        //next one
                        io.emit('dice-update', { name: name, number: diceNumber })
                        //io.emit('dice-update-animation', { name: name, number: diceNumber, nextDiceColor: util.getNextColor(player.Color) })
                        //global.ac.diceColor = util.getNextColor(player.Color)
                    }
                }
            })

            var stepNumber = 0
            socket.on('onMove', function (req) {
                var { name, chess_number, flow_position_from, diceNumber, byClick } = req
                var player = global.ac.players.find(x => x.Name == name)
                var color = player.Color
                var playerPositions = player.Positions
                //move by player or in flow
                if (byClick) {
                    //out home
                    if (playerPositions[chess_number - 1] == -1) {
                        if (chess_number != diceNumber) {
                            return
                        }
                        io.emit('position-update', {
                            name: name,
                            color: color,
                            chess_numbers: [chess_number],
                            position_to: 0,
                            outHome: true,
                        })
                        return
                    }
                    //first step
                    else if (playerPositions[chess_number - 1] == 0) {
                        //first step position should be calculated by color
                        if (color == 'yellow') {
                            flow_position_from = 14 - 1
                        } else if (color == 'blue') {
                            flow_position_from = 27 - 1
                        } else if (color == 'green') {
                            flow_position_from = 40 - 1
                        }
                    }
                    //continue step
                    else {
                        flow_position_from = playerPositions[chess_number - 1]
                    }
                }

                var flow_position_to = flow_position_from + 1

                var chess_numbers_on_this_position = []
                playerPositions.forEach((x, index) => {
                    if (x == playerPositions[chess_number - 1]) {
                        chess_numbers_on_this_position.push(index + 1)
                    }
                })

                //jump logic
                if (stepNumber == diceNumber) {
                    stepNumber = 0

                    flow_position_to = util.jump(flow_position_from, color)

                    //strike other player's chess
                    for (let otherPlayer of global.ac.players) {
                        if (otherPlayer.Name != name) {
                            var otherCount = otherPlayer.Positions.filter(x => x == flow_position_to).length
                            //find other player's chess on the position
                            if (otherCount > 0) {
                                if (playerPositions.filter(x => x == playerPositions[chess_number - 1]).length >= otherCount) {
                                    //others back home :)
                                    //1.update to this position in memory and ui
                                    chess_numbers_on_this_position.forEach(x => platyerPosition[x - 1] = flow_position_to)
                                    io.emit('position-update', { name: name, chess_numbers: chess_numbers_on_this_position, position_to: flow_position_to })
                                    //2.strike other player on this position
                                } else {
                                    //you home :(
                                    chess_numbers_on_this_position.forEach(x => {
                                        io.emit('position-update', { name: name, chess_numbers: chess_numbers_on_this_position, position_to: -1 })
                                    })
                                }
                            }
                        }
                    }
                    //1.your chess number >= other's, you win
                    playerPositions[chess_number - 1] = flow_position_to
                    var nextColor = util.getNextColor(color)
                    global.ac.diceColor = nextColor
                    io.emit('position-update', {
                        name: name,
                        color: color,
                        chess_numbers: chess_numbers_on_this_position,
                        position_to: flow_position_to,
                        nextDiceColor: nextColor
                    })
                } else {
                    stepNumber++

                    io.emit('position-update', {
                        name: name,
                        color: color,
                        chess_numbers: chess_numbers_on_this_position,
                        position_to: flow_position_to,
                        moveNext: true,
                    })
                }
            })
        })
    }
    catch (err) {
        console.error(err)
    }
}

module.exports = {
    init: init
}