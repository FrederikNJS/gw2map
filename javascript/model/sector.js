import Coordinate from 'javascript/model/coordinate'

export default class Sector {
  constructor(sectorDef) {
    this.id = sectorDef.get('id')
    this.name = sectorDef.get('name')
    this.level = sectorDef.get('level')
    this.chatLink = sectorDef.get('chat_link')
    this.coordinate = new Coordinate(sectorDef.get('coord'))
  }

  get olFeature() {
    return new ol.Feature({
      geometry: this.coordinate.olPoint,
      name: this.level === 0 ? this.name : `${this.name} (${this.level})`
    })
  }
}