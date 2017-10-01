class Coord {
    constructor(id, unitLength) {
        this.unitLength = unitLength
        this.id = id
        this.color = this.getColor(id)
        this.goto = this.getGotoId(id)
        this.last = this.getLastFlag(id)
        this.getPosition(id)
    }
    getColor = index => {
        switch (index % 4) {
            case 1: return 'green'
            case 2: return 'red'
            case 3: return 'yellow'
            case 0: return 'blue'
        }
    }
    getGotoId = index => {
        switch (index) {
            case 5: return 17
            case 18: return 30
            case 31: return 43
            case 44: return 4
        }
    }
    getLastFlag = index => {
        if ([11, 24, 37, 50].indexOf(index) > 0) {
            return 'yes'
        }
    }
    getPosition = index => {
        this.top = positionMap[index - 1].unitTop * this.unitLength + 'px'
        this.left = positionMap[index - 1].unitLeft * this.unitLength + 'px'
    }
}

var positionMap = [
    { id: 1, unitLeft: 4, unitTop: 14 },//red start first step
    { id: 2, unitLeft: 4, unitTop: 13 },
    { id: 3, unitLeft: 4, unitTop: 12 },
    { id: 4, unitLeft: 4, unitTop: 11 },

    { id: 5, unitLeft: 3, unitTop: 10 },
    { id: 6, unitLeft: 2, unitTop: 10 },
    { id: 7, unitLeft: 1, unitTop: 10 },

    { id: 8, unitLeft: 0, unitTop: 10 },
    { id: 9, unitLeft: 0, unitTop: 9 },
    { id: 10, unitLeft: 0, unitTop: 8 },
    { id: 11, unitLeft: 0, unitTop: 7 },
    { id: 12, unitLeft: 0, unitTop: 6 },
    { id: 13, unitLeft: 0, unitTop: 5 },
    { id: 14, unitLeft: 0, unitTop: 4 },//yellow start first step

    { id: 15, unitLeft: 1, unitTop: 4 },
    { id: 16, unitLeft: 2, unitTop: 4 },
    { id: 17, unitLeft: 3, unitTop: 4 },

    { id: 18, unitLeft: 4, unitTop: 3 },
    { id: 19, unitLeft: 4, unitTop: 2 },
    { id: 20, unitLeft: 4, unitTop: 1 },
    { id: 21, unitLeft: 4, unitTop: 0 },

    { id: 22, unitLeft: 5, unitTop: 0 },
    { id: 23, unitLeft: 6, unitTop: 0 },
    { id: 24, unitLeft: 7, unitTop: 0 },
    { id: 25, unitLeft: 8, unitTop: 0 },
    { id: 26, unitLeft: 9, unitTop: 0 },
    { id: 27, unitLeft: 10, unitTop: 0 },//blue start first step

    { id: 28, unitLeft: 10, unitTop: 1 },
    { id: 29, unitLeft: 10, unitTop: 2 },
    { id: 30, unitLeft: 10, unitTop: 3 },

    { id: 31, unitLeft: 11, unitTop: 4 },
    { id: 32, unitLeft: 12, unitTop: 4 },
    { id: 33, unitLeft: 13, unitTop: 4 },
    { id: 34, unitLeft: 14, unitTop: 4 },

    { id: 35, unitLeft: 14, unitTop: 5 },
    { id: 36, unitLeft: 14, unitTop: 6 },
    { id: 37, unitLeft: 14, unitTop: 7 },
    { id: 38, unitLeft: 14, unitTop: 8 },
    { id: 39, unitLeft: 14, unitTop: 9 },
    { id: 40, unitLeft: 14, unitTop: 10 }, //green start first step

    { id: 41, unitLeft: 13, unitTop: 10 },
    { id: 42, unitLeft: 12, unitTop: 10 },
    { id: 43, unitLeft: 11, unitTop: 10 },

    { id: 44, unitLeft: 10, unitTop: 11 },
    { id: 45, unitLeft: 10, unitTop: 12 },
    { id: 46, unitLeft: 10, unitTop: 13 },
    { id: 47, unitLeft: 10, unitTop: 14 },

    { id: 48, unitLeft: 9, unitTop: 14 },
    { id: 49, unitLeft: 8, unitTop: 14 },
    { id: 50, unitLeft: 7, unitTop: 14 },
    { id: 51, unitLeft: 6, unitTop: 14 },
    { id: 52, unitLeft: 5, unitTop: 14 },
]

var targetPipeMap = [
    //left top right bottom
    { id: 61, unitLeft: 1, unitTop: 7 },
    { id: 62, unitLeft: 2, unitTop: 7 },
    { id: 63, unitLeft: 3, unitTop: 7 },
    { id: 64, unitLeft: 4, unitTop: 7 },
    { id: 65, unitLeft: 5, unitTop: 7 },
    { id: 66, unitLeft: 6, unitTop: 7 },

    { id: 71, unitLeft: 7, unitTop: 1 },
    { id: 72, unitLeft: 7, unitTop: 2 },
    { id: 73, unitLeft: 7, unitTop: 3 },
    { id: 74, unitLeft: 7, unitTop: 4 },
    { id: 75, unitLeft: 7, unitTop: 5 },
    { id: 76, unitLeft: 7, unitTop: 6 },

    { id: 81, unitLeft: 13, unitTop: 7 },
    { id: 82, unitLeft: 12, unitTop: 7 },
    { id: 83, unitLeft: 11, unitTop: 7 },
    { id: 84, unitLeft: 10, unitTop: 7 },
    { id: 85, unitLeft: 9, unitTop: 7 },
    { id: 86, unitLeft: 8, unitTop: 7 },

    { id: 91, unitLeft: 7, unitTop: 13 },
    { id: 92, unitLeft: 7, unitTop: 12 },
    { id: 93, unitLeft: 7, unitTop: 11 },
    { id: 94, unitLeft: 7, unitTop: 10 },
    { id: 95, unitLeft: 7, unitTop: 9 },
    { id: 96, unitLeft: 7, unitTop: 8 },
]

var outHomeMap = [
    { color: 'red', unitLeft: 3, unitTop: 14 },
    { color: 'yellow', unitLeft: 0, unitTop: 3 },
    { color: 'blue', unitLeft: 11, unitTop: 0 },
    { color: 'green', unitLeft: 14, unitTop: 11 }
]

var homeMap = [
    { color: 'red', unitLeft: 1 / 4, unitTop: 12 + 1 / 4, number: 1 },
    { color: 'red', unitLeft: 1 + 3 / 4, unitTop: 12 + 1 / 4, number: 2 },
    { color: 'red', unitLeft: 1 / 4, unitTop: 12 + 1 + 3 / 4, number: 3 },
    { color: 'red', unitLeft: 1 + 3 / 4, unitTop: 12 + 1 + 3 / 4, number: 4 },

    { color: 'yellow', unitLeft: 1 / 4, unitTop: 1 / 4, number: 1 },
    { color: 'yellow', unitLeft: 1 + 3 / 4, unitTop: 1 / 4, number: 2 },
    { color: 'yellow', unitLeft: 1 / 4, unitTop: 1 + 3 / 4, number: 3 },
    { color: 'yellow', unitLeft: 1 + 3 / 4, unitTop: 1 + 3 / 4, number: 4 },

    { color: 'blue', unitLeft: 12 + 1 / 4, unitTop: 1 / 4, number: 1 },
    { color: 'blue', unitLeft: 12 + 1 + 3 / 4, unitTop: 1 / 4, number: 2 },
    { color: 'blue', unitLeft: 12 + 1 / 4, unitTop: 1 + 3 / 4, number: 3 },
    { color: 'blue', unitLeft: 12 + 1 + 3 / 4, unitTop: 1 + 3 / 4, number: 4 },

    { color: 'green', unitLeft: 12 + 1 / 4, unitTop: 12 + 1 / 4, number: 1 },
    { color: 'green', unitLeft: 12 + 1 + 3 / 4, unitTop: 12 + 1 / 4, number: 2 },
    { color: 'green', unitLeft: 12 + 1 / 4, unitTop: 12 + 1 + 3 / 4, number: 3 },
    { color: 'green', unitLeft: 12 + 1 + 3 / 4, unitTop: 12 + 1 + 3 / 4, number: 4 },
]

export default class CoordCollection {
    constructor(screenWidth) {
        this.unitLength = screenWidth / 15
        this.ChessRoadCollection = []
        for (let i = 1; i < 53; i++) {
            this.ChessRoadCollection.push(new Coord(i, this.unitLength))
        }

        this.ChessTargetPipeCollection = []
        for (let item of targetPipeMap) {
            this.ChessTargetPipeCollection.push({
                id: item.id,
                top: item.unitTop * this.unitLength + 'px',
                left: item.unitLeft * this.unitLength + 'px',
                color: this.getTargetPipeColor(item.id)
            })
        }

        this.RoadCollection = this.ChessRoadCollection.concat(this.ChessTargetPipeCollection)

        this.OutHomeCollection = []
        for (let item of outHomeMap) {
            this.OutHomeCollection.push({
                color: item.color,
                top: item.unitTop * this.unitLength + 'px',
                left: item.unitLeft * this.unitLength + 'px',
            })
        }

        this.HomeCollection = []
        for (let item of homeMap) {
            this.HomeCollection.push({
                color: item.color,
                top: item.unitTop * this.unitLength + 'px',
                left: item.unitLeft * this.unitLength + 'px',
                number: item.number
            })
        }

    }
    getTargetPipeColor = index => {
        if (index < 70) {
            return 'yellow'
        } else if (index < 80) {
            return 'blue'
        } else if (index < 90) {
            return 'green'
        } else {
            return 'red'
        }
    }
}