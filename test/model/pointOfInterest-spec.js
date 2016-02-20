import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'
chai.use(chaiImmutable)
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import Immutable from 'immutable'
import ol from 'openlayers'
import PointOfInterest from 'javascript/model/pointOfInterest'

describe('A point of interest', function() {
  let poiDef
  let iconUrls
  let poi
  let coordinateSpy

  beforeEach(function() {
    poiDef = Immutable.fromJS({
      id: 'an ID',
      type: 'waypoint',
      name: 'a name',
      coord: [1, 2],
      chat_link: '[chatLink]',
    })
    iconUrls = Immutable.fromJS({
      "map_poi": "poiUrl",
      "map_dungeon": "dungeonUrl",
      "map_waypoint": "waypointUrl",
    })
    coordinateSpy = sinon.spy()
    poi = new PointOfInterest(poiDef, iconUrls, coordinateSpy)
  })

  describe("#constructor", function() {
    it('should instantiate with the defined properties', function() {
      expect(poi.id).to.equal('an ID')
      expect(poi.type).to.equal('waypoint')
      expect(poi.name).to.equal("a name")
      expect(coordinateSpy).to.have.been.calledWith(poiDef.get('coord'))
      expect(poi.chatLink).to.equal('[chatLink]')
      expect(poi.iconUrl).to.equal('waypointUrl')
      expect(poi._iconScale).to.equal(0.5)
    })

    it('should get type poi if given type landmark', function() {
      const landmarkDef = poiDef.set('type', 'landmark')
      const poi = new PointOfInterest(landmarkDef, iconUrls, coordinateSpy)
      expect(poi.type).to.equal('poi')
      expect(poi.iconUrl).to.equal('poiUrl')
      expect(poi._iconScale).to.equal(0.75)
    })

    it('should get type dungeon if given type unlock', function() {
      const unlockDef = poiDef.set('type', 'unlock')
      const dungeon = new PointOfInterest(unlockDef, iconUrls, coordinateSpy)
      expect(dungeon.type).to.equal('dungeon')
      expect(dungeon.iconUrl).to.equal('dungeonUrl')
      expect(dungeon._iconScale).to.equal(1)
    })
  })

  describe('#olFeature', function() {
    it('should return an ol.Feature', function() {
      expect(poi.olFeature).to.be.an.instanceOf(ol.Feature)
    })
  })
})
