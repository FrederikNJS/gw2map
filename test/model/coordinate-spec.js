import Immutable from 'immutable'
import Coordinate from 'javascript/model/coordinate'

describe('A Coordinate', function() {
  const rawCoord = Immutable.fromJS([2, 5])
  const ol = {geom: {Point: jasmine.createSpy('Point')}}
  const coord = new Coordinate(rawCoord, ol)

  it('should have the x and y coordinates', function() {
    expect(coord.x).toEqual(rawCoord.get(0))
    expect(coord.y).toEqual(rawCoord.get(1))
  })

  it('should be able to output an olPoint', function() {
    const point = coord.olPoint
    expect(ol.geom.Point).toHaveBeenCalledWith([2, 32763])
  })
})
