import _ol from 'openlayers'

export default class Coordinate {
  constructor(ary, ol=_ol) {
    this.ol = ol
    this.x = ary.get(0)
    this.y = ary.get(1)
  }

  get olPoint() {
    return new this.ol.geom.Point([this.x, 32768 - this.y])
  }
}
