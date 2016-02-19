import Immutable from 'immutable'
import _Coordinate from 'javascript/model/coordinate'

const typeMap = Immutable.Map({
  'landmark': 'poi',
  'unlock': 'dungeon',
})

const iconScales = Immutable.Map({
  'poi': 0.75,
  'waypoint': 0.5,
})

export default class PointOfInterest {
  constructor(poiDef, iconUrls, Coordinate=_Coordinate) {
    this.id = poiDef.get('id')
    this.type = typeMap.get(poiDef.get('type'), poiDef.get('type'))
    this.name = poiDef.get('name', null)
    this.coordinate = new Coordinate(poiDef.get('coord'))
    this.chatLink = poiDef.get('chat_link')
    this.iconUrl = iconUrls.get(`map_${this.type}`)
  }

  get _iconScale() {
    return iconScales.get(this.type, 1)
  }

  get olFeature() {
    const feature = new ol.Feature({
      geometry: this.coordinate.olPoint,
      text: this.name,
    })
    feature.setStyle(new ol.style.Style({
      image: new ol.style.Icon({
        src: this.iconUrl,
        scale: this._iconScale,
      }),
    }))
    return feature
  }
}
