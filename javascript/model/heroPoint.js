import Coordinate from 'javascript/model/coordinate'

export default class HeroPoint {
  constructor(skillChallengeDef, iconUrls) {
    this.coordinate = new Coordinate(skillChallengeDef.get('coord'))
    this._iconUrl = iconUrls.get('map_heropoint')
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
