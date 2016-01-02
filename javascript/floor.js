import Region from "javascript/region"
import Coordinate from "javascript/coordinate"

export default class Floor {
  constructor(floorDef) {
    this.id = floorDef.get('id')
    this.regions = floorDef.get('regions').valueSeq().map(regionDef => new Region(regionDef))
    this.dimensions = new Coordinate(floorDef.get('texture_dims'))
  }
}
