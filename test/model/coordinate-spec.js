import Immutable from 'immutable'
import Coordinate from 'javascript/model/coordinate'

describe('A coordinate', function() {
  const rawCoord = Immutable.fromJS([2, 5])
  const coord = new Coordinate(rawCoord)

  it('should instantiate correctly', function() {
    expect(coord.x).toEqual(rawCoord.get(0))
    expect(coord.y).toEqual(rawCoord.get(1))
  })

  it('should be able to output a olPoint', function() {
    expect(coord.olPoint.getType()).toEqual('Point')
    expect(coord.olPoint.getCoordinates()).toEqual([coord.x, 32768 - coord.y])
  })
})
