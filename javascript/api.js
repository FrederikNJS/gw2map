import qwest from 'qwest'
import Immutable from 'immutable'
import Continent from 'javascript/model/continent'
import Floor from 'javascript/model/floor'

function postProcess(xhr, response) {
  return Immutable.fromJS(response)
}

export function getContinents() {
  return qwest.get('https://api.guildwars2.com/v2/continents', {ids: 'all'}, {cache: true})
    .then(postProcess)
    .then(rawContinents => rawContinents.map(continent => new Continent(continent)))
}

export function getFloor(continentId, floorId) {
  const floorPromise = qwest.get(`https://api.guildwars2.com/v2/continents/${continentId}/floors/${floorId}`, {}, {cache: true})
    .then(postProcess)
  const iconPromise = getIcons()

  return Promise.all([floorPromise, iconPromise]).then(function([floor, iconUrls]) {
    return new Floor(floor, iconUrls)
  })
}

let iconPromise
export function getIcons() {
  if(!iconPromise) {
    iconPromise = qwest.get('https://api.guildwars2.com/v2/files', {
      ids: Immutable.List([
        'map_waypoint',
        'map_dungeon',
        'map_heart_empty',
        'map_poi',
        'map_heropoint',
        'map_vista',
      ]).join(','),
    }, {
      cache: true,
    }).then(postProcess)
      .then(x=>x.groupBy(y=>y.get('id'))
                .map(x=>x.first().get('icon')))
  }
  return iconPromise
}
