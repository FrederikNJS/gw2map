import Coordinate from 'javascript/coordinate'

export default class HeroPoint {
  constructor(skillChallengeDef) {
    this.coordinate = new Coordinate(skillChallengeDef.get('coord'))
  }
}
