import Immutable from 'immutable'
import Region from 'javascript/model/region'
import Floor from 'javascript/model/floor'

describe('A Floor', function() {
  let floor
  beforeEach(function() {
    const rawFloor = Immutable.fromJS({
      id: 1,
      regions: Immutable.fromJS({}),
      texture_dims: Immutable.fromJS([4, 5]),
    })
    floor = new Floor(rawFloor)
  })

  it('should have the defined properties', function() {
    expect(floor.id).toEqual(1)
    expect(floor.regions.size).toEqual(0)
    expect(floor.dimensions.x).toEqual(4)
    expect(floor.dimensions.y).toEqual(5)
  })
})
