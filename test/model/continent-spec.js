import Immutable from 'immutable'
import Continent from 'javascript/model/continent'

describe('A Continent', function() {
  const rawContinent = Immutable.fromJS({
    id: 1,
    name: "Continent Name",
    continent_dims: [10, 15],
    min_zoom: 2,
    max_zoom: 3,
    floors: [4, 5, 6],
  })
  const continent = new Continent(rawContinent)

  it('should have the defined properties', function() {
    expect(continent.id).toEqual(1)
    expect(continent.name).toEqual("Continent Name")
    expect(continent.dimensions).toEqual(Immutable.fromJS([10, 15]))
    expect(continent.minZoom).toEqual(2)
    expect(continent.maxZoom).toEqual(3)
    expect(continent.floorIds).toEqual(Immutable.fromJS([4, 5, 6]))
  })
})
