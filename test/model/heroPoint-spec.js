import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'
chai.use(chaiImmutable)
import Immutable from 'immutable'
import ol from 'openlayers'
import HeroPoint from 'javascript/model/heroPoint'

describe('A HeroPoint', function() {
  const rawHeroPoint = Immutable.fromJS({
    coord: [1, 2],
  })
  const iconUrls = Immutable.fromJS({
    map_heropoint: "Icon URL",
  })
  const heroPoint = new HeroPoint(rawHeroPoint, iconUrls)

  it('should have the defined properties', function() {
    expect(heroPoint.coordinate.constructor.name).to.equal('Coordinate')
    expect(heroPoint._iconUrl).to.equal('Icon URL')
  })

  it('should be able to return a openlayers feature', function() {
    expect(heroPoint.olFeature).to.be.instanceOf(ol.Feature)
  })
})
