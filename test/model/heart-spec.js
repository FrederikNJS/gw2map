import Immutable from 'immutable'
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
    expect(heart.id).toEqual(1)
    expect(heart.level).toEqual(2)
    expect(heart.chatLink).toEqual('[link]')
    expect(heart.objective).toEqual('This is an objective')
    expect(heart.coordinate.constructor.name).toEqual('Coordinate')
    expect(heart.coordinate.x).toEqual(3)
    expect(heart.coordinate.y).toEqual(4)
    expect(heart._iconUrl).toEqual('Icon URL')
  })

  it('should be able to return a openlayers feature', function() {
    expect(typeof heart.olFeature).toEqual('object')
  })
})
