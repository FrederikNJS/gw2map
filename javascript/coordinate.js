import ol from 'openlayers'
import Immutable from 'immutable'

export default class Coordinate {
  constructor(ary) {
    this.x = ary.get(0)
    this.y = ary.get(1)
  }

  get olPoint() {
    return new ol.geom.Point([this.x, 32768 - this.y])
  }
}
