import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'
chai.use(chaiImmutable)
import Immutable from 'immutable'
import ol from 'openlayers'
import Heart from 'javascript/model/heart'

describe('A Heart', function() {
  const rawHeart = Immutable.fromJS({
    id: 1,
    level: 2,
    chat_link: '[link]',
    objective: 'This is an objective',
    coord: [3, 4],
  })
  const iconUrls = Immutable.fromJS({
    map_heart_empty: 'Icon URL',
  })
  const heart = new Heart(rawHeart, iconUrls)

  it('should have the defined properties', function() {
    expect(heart.id).to.equal(1)
    expect(heart.level).to.equal(2)
    expect(heart.chatLink).to.equal('[link]')
    expect(heart.objective).to.equal('This is an objective')
    expect(heart.coordinate.constructor.name).to.equal('Coordinate')
    expect(heart.coordinate.x).to.equal(3)
    expect(heart.coordinate.y).to.equal(4)
    expect(heart._iconUrl).to.equal('Icon URL')
  })

  it('should be able to return a openlayers feature', function() {
    expect(heart.olFeature).to.be.instanceOf(ol.Feature)
  })
})
