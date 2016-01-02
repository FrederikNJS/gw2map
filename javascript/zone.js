import Rect from 'javascript/rect'

export default class Zone {
  constructor(mapDef) {
    this.name = mapDef.get('name')
    this.minLevel = mapDef.get('min_level')
    this.maxLevel = mapDef.get('max_level')
    this.id = mapDef.get('id')
    this.defaultFloor = mapDef.get('default_floor')
    this.continentRect = new Rect(mapDef.get('continent_rect'))
  }
}
