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
    },
    jump: function (pid, color) {
        if (pid < 53) {
            if (pid % 4 == 1 && color == 'green') {
                if (pid == 5) {
                    pid = 17
                } else {
                    pid += 4
                }
            } else if (pid % 4 == 2 && color == 'red') {
                if (pid == 18) {
                    pid = 30
                } else {
                    pid += 4
                }
            } else if (pid % 4 == 3 && color == 'yellow') {
                if (pid == 31) {
                    pid = 43
                } else {
                    pid += 4
                }
            } else if (pid % 4 == 0 && color == 'blue') {
                if (pid == 44) {
                    pid = 4
                } else {
                    pid += 4
                }
            }
        }
        return pid
    }
}