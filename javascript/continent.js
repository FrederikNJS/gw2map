import Floor from 'javascript/floor'

export default class Continent {
  constructor(continentDef) {
    this.id = continentDef.get('id')
    this.name = continentDef.get('name')
    this.dims = continentDef.get('continent_dims')
    this.minZoom = continentDef.get('min_zoom')
    this.maxZoom = continentDef.get('max_zoom')
    this.floorIds = continentDef.get('floors')
  }
}
