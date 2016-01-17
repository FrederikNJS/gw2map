import Immutable from 'immutable'
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
    expect(heroPoint.coordinate.constructor.name).toEqual('Coordinate')
    expect(heroPoint._iconUrl).toEqual('Icon URL')
  })

  it('should be able to return a openlayers feature', function() {
    expect(typeof heroPoint.olFeature).toEqual('object')
  })
})
