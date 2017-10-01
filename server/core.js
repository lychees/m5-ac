var util = require('./util')

module.exports = {
    getRoomData: function (req, res) {
        res.send(global.ac)
    },
    getChessData: function (req, res) {
        if (!global.ac.diceColor) {
            global.ac.diceColor = ['red', 'yellow', 'blue', 'green'][util.getRandomNum(0, 3)]
        }
        //global.players
        //Positions
        res.send(global.ac)
    }
}