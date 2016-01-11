import Region from "javascript/model/region"
import Coordinate from "javascript/model/coordinate"

export default class Floor {
  constructor(floorDef, iconUrls) {
    this.id = floorDef.get('id')
    this.regions = floorDef.get('regions').valueSeq().map(regionDef => new Region(regionDef, iconUrls))
    this.dimensions = new Coordinate(floorDef.get('texture_dims'))
  }

  get zones() {
    return this.regions.map(region => region.zones).flatten()
  }
}
