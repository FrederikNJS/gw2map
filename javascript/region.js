import ol from 'openlayers'
import Zone from 'javascript/zone'
import Coordinate from 'javascript/coordinate'

export default class Region {
  constructor(regionDef) {
    this.labelCoordinate = new Coordinate(regionDef.get('label_coord'))
    this._zones = regionDef.get('maps').valueSeq().map(mapDef=>new Zone(mapDef))
    this.name = regionDef.get('name')
  }

  get zones() {
    return this._zones.filter(zone => !Zone.falseZones.has(zone.id))
  }

  getFeature() {
    return new ol.Feature({
      geometry: this.labelCoordinate.getOLPoint(),
      name: this.name
    });
  }
}
