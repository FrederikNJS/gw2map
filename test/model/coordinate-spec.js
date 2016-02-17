import { expect } from 'chai'
import sinon from 'sinon'
// import sinonChai from 'sinon-chai'
// chai.use(sinonChai)
import Immutable from 'immutable'
import Coordinate from 'javascript/model/coordinate'

describe('A Coordinate', function() {
  const rawCoord = Immutable.fromJS([2, 5])
  const ol = {geom: {Point: sinon.spy()}}
  const coord = new Coordinate(rawCoord, ol)

  it('should have the x and y coordinates', function() {
    expect(coord.x).to.equal(rawCoord.get(0))
    expect(coord.y).to.equal(rawCoord.get(1))
  })

  it('should be able to output an olPoint', function() {
    const point = coord.olPoint
    expect(ol.geom.Point.calledWith([2, 32763])).to.be.ok //
  })
})
