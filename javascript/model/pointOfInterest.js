import Immutable from 'immutable'
import {getIcons} from 'javascript/api'
import Coordinate from 'javascript/model/coordinate'

export default class PointOfInterest {
  constructor(poiDef, iconUrls) {
    this.id = poiDef.get('id')
    this.type = poiDef.get('type')
    this.name = poiDef.get('name', null)
    this.coordinate = new Coordinate(poiDef.get('coord'))
    this.chatLink = poiDef.get('chat_link')
    this.iconUrls = iconUrls
  }

  get _iconUrl() {
    switch(this.type) {
      case 'vista':
        return this.iconUrls.get('map_vista')
      case 'waypoint':
        return this.iconUrls.get('map_waypoint')
      case 'landmark':
        return this.iconUrls.get('map_poi')
      case 'unlock':
        return this.iconUrls.get('map_dungeon')
    }
  }

  get _iconScale() {
    if(Immutable.Set(['waypoint', 'landmark']).has(this.type)) {
      return 0.5
    } else {
      return 1
    }
  }

  get olFeature() {
    const feature = new ol.Feature({
      geometry: this.coordinate.olPoint,
      text: this.name,
    })
    feature.setStyle(new ol.style.Style({
      image: new ol.style.Icon({
        src: this._iconUrl,
        scale: this._iconScale,
      }),
    }))
    return feature
  }
}
