import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'
chai.use(chaiImmutable)
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
    expect(continent.id).to.equal(1)
    expect(continent.name).to.equal("Continent Name")
    expect(continent.dimensions).to.equal(Immutable.fromJS([10, 15]))
    expect(continent.minZoom).to.equal(2)
    expect(continent.maxZoom).to.equal(3)
    expect(continent.floorIds).to.equal(Immutable.fromJS([4, 5, 6]))
  })
})
