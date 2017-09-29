var util = require('./util')

module.exports = {
    getRoomData: function (req, res) {
        res.send(global.players)
    },
    getChessData: function (req, res) {
        if (!global.randomColor) {
            global.randomColor = ['red', 'yellow', 'blue', 'green'][util.getRandomNum(0, 3)]
        }
        //global.players
        //Positions
        res.send(global.randomColor)
    }
}