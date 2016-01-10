import Coordinate from 'javascript/model/coordinate'

export default class Heart {
  constructor(taskDef) {
    this.id = taskDef.get('id')
    this.level = taskDef.get('level')
    this.chatLink = taskDef.get('chat_link')
    this.objective = taskDef.get('objective')
    this.coordinate = new Coordinate(taskDef.get('coord'))
  }
}
