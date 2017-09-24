module.exports = {
    getRoomData: function (req, res) {
        res.send(global.players);
    },
}