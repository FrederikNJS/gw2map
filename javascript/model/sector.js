import Rainbow from 'rainbow'
import Coordinate from 'javascript/model/coordinate'

const zoneLevelGradient = new Rainbow()
zoneLevelGradient.setSpectrum('limegreen', 'yellow', 'ff4444')
zoneLevelGradient.setNumberRange(0, 80)

export default class Sector {
  constructor(sectorDef, zoneMinLevel, zoneMaxLevel) {
    this.id = sectorDef.get('id')
    this.name = sectorDef.get('name')
    this.level = sectorDef.get('level')
    this.chatLink = sectorDef.get('chat_link')
    this.coordinate = new Coordinate(sectorDef.get('coord'))

    if(zoneMinLevel < zoneMaxLevel) {
      const levelGradient = new Rainbow()
      levelGradient.setSpectrum('limegreen', 'yellow', 'ff4444')
      levelGradient.setNumberRange(zoneMinLevel, zoneMaxLevel)
      this.labelColor = `#${levelGradient.colourAt(this.level)}`
    } else {
      this.labelColor = `#${zoneLevelGradient.colourAt(this.level)}`
    }
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
        fill: new ol.style.Fill({color: this.labelColor}),
        stroke: new ol.style.Stroke({color: "#000000", width: 2})
      })
    }))
    return feature
  }
}
