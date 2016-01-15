import ol from 'openlayers'
import Zone from 'javascript/model/zone'
import Coordinate from 'javascript/model/coordinate'

export default class Region {
  constructor(regionDef, iconUrls) {
    this.labelCoordinate = new Coordinate(regionDef.get('label_coord'))
    this._zones = regionDef.get('maps').valueSeq().map(mapDef=>new Zone(mapDef, iconUrls))
    this.name = regionDef.get('name')
  }

  get zones() {
    return this._zones.filter(zone => !Zone.falseZones.has(zone.id))
  }

  get olFeature() {
    const feature = new ol.Feature({
      geometry: this.labelCoordinate.olPoint,
    })
    feature.setStyle(new ol.style.Style({
      text: new ol.style.Text({
        textAlign: "center",
        textBaseline: "middle",
        font: 'bold 1em sans-serif',
        text: this.name,
        fill: new ol.style.Fill({color: "#ffffff"}),
        stroke: new ol.style.Stroke({color: "#000000", width: 2}),
      }),
    }))
    return feature
  }
}
