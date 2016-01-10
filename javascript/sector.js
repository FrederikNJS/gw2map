import Coordinate from 'javascript/coordinate'

export default class Sector {
  constructor(sectorDef) {
    this.id = sectorDef.get('id')
    this.name = sectorDef.get('name')
    this.level = sectorDef.get('level')
    this.chatLink = sectorDef.get('chat_link')
    this.coordinate = new Coordinate(sectorDef.get('coord'))
  }
}
