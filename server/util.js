module.exports = {
    getRandomNum: function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range))
    },
    getNextColor: function (color) {
        switch (color) {
            case 'red': return 'yellow'
            case 'yellow': return 'blue'
            case 'blue': return 'green'
            case 'green': return 'red'
        }
    }
}