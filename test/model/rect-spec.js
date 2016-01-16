import Immutable from 'immutable'
import Rect from 'javascript/model/rect'

describe("A Rect", function() {
  const rawRect = Immutable.fromJS([[1, 2], [3, 4]])
  const rect = new Rect(rawRect)

  it('should have the corners with the right values', function() {
    expect(rect.topLeft.constructor.name).toEqual('Coordinate')
    expect(rect.bottomRight.constructor.name).toEqual('Coordinate')

    expect(rect.topLeft.x).toEqual(1)
    expect(rect.topLeft.y).toEqual(2)
    expect(rect.bottomRight.x).toEqual(3)
    expect(rect.bottomRight.y).toEqual(4)
  })

  it('should be able to calculate it\'s center', function() {
    expect(rect.center.x).toEqual(2)
    expect(rect.center.y).toEqual(3)
  })
})
