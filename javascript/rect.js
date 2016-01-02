import Coordinate from 'javascript/coordinate'

export default class Rect {
    constructor(ary) {
        this.topLeft = new Coordinate(ary[0])
        this.bottomRight = new Coordinate(ary[1])
    }
}
