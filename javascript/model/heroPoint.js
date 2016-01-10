import Coordinate from 'javascript/model/coordinate'

export default class HeroPoint {
  constructor(skillChallengeDef) {
    this.coordinate = new Coordinate(skillChallengeDef.get('coord'))
  }
}
