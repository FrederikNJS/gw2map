import Immutable from 'immutable'
import Coordinate from 'javascript/coordinate'

export default class Rect {
  constructor(ary) {
    this.topLeft = new Coordinate(ary.get(0))
    this.bottomRight = new Coordinate(ary.get(1))
  }

  get center() {
    return new Coordinate(Immutable.List([
      (this.topLeft.x + this.bottomRight.x) / 2,
      (this.topLeft.y + this.bottomRight.y) / 2
    ]))
  }
}
