module.exports = class Player {
    constructor(name, color) {
        this.Name = name
        this.Color = color
        this.Positions = [-1, -1, -1, -1]
        this.Cards = []
    }
}