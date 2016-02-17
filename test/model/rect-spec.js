import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'
chai.use(chaiImmutable)
import Immutable from 'immutable'
import Rect from 'javascript/model/rect'

describe("A Rect", function() {
  const rawRect = Immutable.fromJS([[1, 2], [3, 4]])
  const rect = new Rect(rawRect)

  it('should have the corners with the right values', function() {
    expect(rect.topLeft.constructor.name).to.equal('Coordinate')
    expect(rect.bottomRight.constructor.name).to.equal('Coordinate')

    expect(rect.topLeft.x).to.equal(1)
    expect(rect.topLeft.y).to.equal(2)
    expect(rect.bottomRight.x).to.equal(3)
    expect(rect.bottomRight.y).to.equal(4)
  })

  it('should be able to calculate it\'s center', function() {
    expect(rect.center.x).to.equal(2)
    expect(rect.center.y).to.equal(3)
  })
})
