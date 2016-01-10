import Coordinate from 'javascript/coordinate'

export default class PointOfInterest {
  constructor(poiDef) {
    this.id = poiDef.get('id')
    this.type = poiDef.get('type')
    this.coordinate = new Coordinate(poiDef.get('coord'))
    this.chatLink = new poiDef.get('chat_link')
  }
}
