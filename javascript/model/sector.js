import Coordinate from 'javascript/model/coordinate'

export default class Sector {
  constructor(sectorDef) {
    this.id = sectorDef.get('id')
    this.name = sectorDef.get('name')
    this.level = sectorDef.get('level')
    this.chatLink = sectorDef.get('chat_link')
    this.coordinate = new Coordinate(sectorDef.get('coord'))
  }

  get displayName() {
    if (this.level === 0) {
      return this.name
    } else {
      return `${this.name} (${this.level})`
    }
  }

  get olFeature() {
    const feature = new ol.Feature({
      geometry: this.coordinate.olPoint
    })
    feature.setStyle(new ol.style.Style({
      text: new ol.style.Text({
        textAlign: "center",
        textBaseline: "middle",
        font: 'normal 0.8em sans-serif',
        text: this.displayName,
        fill: new ol.style.Fill({color: "#ffffff"}),
        stroke: new ol.style.Stroke({color: "#000000", width: 2})
      })
    }))
    return feature
  }
}
