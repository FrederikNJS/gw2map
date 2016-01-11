import Coordinate from 'javascript/model/coordinate'

export default class Heart {
  constructor(taskDef, iconUrls) {
    this.id = taskDef.get('id')
    this.level = taskDef.get('level')
    this.chatLink = taskDef.get('chat_link')
    this.objective = taskDef.get('objective')
    this.coordinate = new Coordinate(taskDef.get('coord'))
    this._iconUrl = iconUrls.get('map_heart_empty')
  }

  get olFeature() {
    const feature = new ol.Feature({
      geometry: this.coordinate.olPoint
    })
    feature.setStyle(new ol.style.Style({
      image: new ol.style.Icon({
        src: this._iconUrl
      })
    }))
    return feature
  }
}
