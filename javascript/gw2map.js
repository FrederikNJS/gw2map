import Floor from 'javascript/model/floor'
import Zone from 'javascript/model/zone'
import { getContinents, getIcons, getFloor } from 'javascript/api'
import Immutable from 'immutable'
import ol from 'openlayers'
import LayerSwitcher from 'ol3-layerswitcher'

var container = document.getElementById('popup')
var content = document.getElementById('popup-content')

function closePopup() {
  overlay.setPosition(undefined)
  return false
}

var overlay = new ol.Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
})

const attribution = new ol.Attribution({
  html: '<p><a href="https://github.com/FrederikNS/gw2map">The source code for this project</a> is released as ' +
  'open source under <a href="http://frederikns.github.io/gw2map/LICENSE.txt">the AGPL 3.0 license.</a></p>' +
  '<p>The graphical assets of the map and icons as well as the data is property of ArenaNet and subject to ' +
  'the following copyright:</p><p>"© 2014 ArenaNet, LLC. All rights reserved. NCSOFT, the interlocking NC l' +
  'ogo, ArenaNet, Guild Wars, Guild Wars Factions, Guild Wars Nightfall, Guild Wars: Eye of the North, Guil' +
  'd Wars 2, and all associated logos and designs are trademarks or registered trademarks of NCSOFT Corpora' +
  'tion. All other trademarks are the property of their respective owners."</p>',
})

const continentsPromise = getContinents()
const floorPromise = getFloor(1, 0)

continentsPromise.then(function(continents) {
  const tileSize = 256
  const projection = new ol.proj.Projection({
    code: 'ZOOMIFY',
    units: 'pixels',
    extent: [0, 0, continents.get(0).dimensions.get(0), continents.get(0).dimensions.get(1)],
  })
  const projectionExtent = projection.getExtent()
  const maxResolution = ol.extent.getWidth(projectionExtent) / tileSize
  const resolutions = Immutable.Range(0, 8).map(x=>maxResolution / Math.pow(2, x)).toJS()

  const map = new ol.Map({
    target: "map",
    overlays: [overlay],
    view: new ol.View({
      projection: projection,
      center: [16384, 16384],
      zoom: 3,
      minZoom: continents.getIn([0, 'min_zoom']),
      maxZoom: continents.getIn([0, 'max_zoom']),
      extent: projectionExtent,
    }),
  })

  map.on('click', function(event) {
    var feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
      return feature
    })

    if (feature && feature.get('text')) {
      content.textContent = feature.get('text')
      overlay.setPosition(feature.get('geometry').getCoordinates())
    } else {
      closePopup()
    }
  })

  const floorNames = Immutable.fromJS([
    {id: 3, name: 'Depths'},
    {id: 0, name: 'Undeground'},
    {id: 1, name: 'Surface'},
    {id: 2, name: 'Sky'},
  ])

  const floorLayersList = floorNames
    .map(floorDef => new ol.layer.Tile({
      title: `Tyria - Level ${floorDef.get('name')}`,
      type: 'base',
      source: new ol.source.TileImage({
        attributions: [attribution],
        tileUrlFunction: function([z, x, y], pixelRatio, projection) {
          const tileMirror = 2 * (x % 2) - (y % 2) + 1
          return `https://tiles${tileMirror}.guildwars2.com/1/${floorDef.get('id')}/${z}/${x}/${-y - 1}.jpg`
        },
        projection: projection,
        tileGrid: new ol.tilegrid.TileGrid({
          origin: ol.extent.getTopLeft(projectionExtent),
          resolutions: resolutions,
          tileSize: tileSize,
        }),
      }),
      extent: projectionExtent,
    })).toJS()

  const baseLayers = new ol.layer.Group({
    title: "Base",
    layers: floorLayersList,
  })

  map.addLayer(baseLayers)

  const layerSwitcher = new ol.control.LayerSwitcher()
  map.addControl(layerSwitcher)

  floorPromise.then(function(floor) {
    const regions = floor.regions
    const zones = regions.map(region => region.zones).flatten()
    const sectors = zones.map(zone => zone.sectors).flatten()
    const vistas = zones.map(zone => zone.vistas).flatten()
    const dungeons = zones.map(zone => zone.dungeons).flatten()
    const pointsOfInterest = zones.map(zone => zone.pointsOfInterest).flatten()
    const waypoints = zones.map(zone => zone.waypoints).flatten()
    const hearts = zones.map(zone => zone.hearts).flatten()
    const heroPoints = zones.map(zone => zone.heroPoints).flatten()

    const regionFeatures = regions.map(region => region.olFeature)
    const zoneFeatures = zones.map(zone => zone.olFeature)
    const sectorFeatures = sectors.map(sector => sector.olFeature)
    const vistaFeatures = vistas.map(vista => vista.olFeature)
    const dungeonFeatures = dungeons.map(dungeon => dungeon.olFeature)
    const pointOfInterestFeatures = pointsOfInterest.map(pointOfInterest => pointOfInterest.olFeature)
    const waypointFeatures = waypoints.map(waypoint => waypoint.olFeature)
    const heartFeatures = hearts.map(heart => heart.olFeature)
    const heroPointFeatures = heroPoints.map(heroPoint => heroPoint.olFeature)

    function featureSource(features) {
      return new ol.source.Vector({
        features: features.toJS(),
        wrapX: false,
      })
    }

    const regionLayer = new ol.layer.Vector({
      title: 'Regions',
      source: featureSource(regionFeatures),
      extent: projectionExtent,
    })

    const zoneLayer = new ol.layer.Vector({
      title: 'Zones',
      visible: false,
      source: featureSource(zoneFeatures),
      extent: projectionExtent,
    })

    const sectorLayer = new ol.layer.Vector({
      title: 'Sectors',
      visible: false,
      source: featureSource(sectorFeatures),
      extent: projectionExtent,
    })

    const automaticMode = new ol.layer.Vector({
      title: '<b>Automatic</b>',
    })

    map.getView().on('change:resolution', function(event) {
      const newResolution = event.target.get(event.key)
      if (automaticMode.getVisible()) {
        regionLayer.setVisible(newResolution >= 16)
        zoneLayer.setVisible(newResolution >= 4 && newResolution < 32)
        sectorLayer.setVisible(newResolution >= 1 && newResolution < 8)
      }
    })

    const labelLayers = new ol.layer.Group({
      title: "Labels",
      zIndex: 100,
      layers: [
        sectorLayer,
        zoneLayer,
        regionLayer,
        automaticMode,
      ],
    })

    const vistaLayer = new ol.layer.Vector({
      title: 'Vistas',
      visible: false,
      source: featureSource(vistaFeatures),
      extent: projectionExtent,
    })

    const dungeonLayer = new ol.layer.Vector({
      title: 'Dungeons',
      visible: false,
      source: featureSource(dungeonFeatures),
      extent: projectionExtent,
    })

    const pointOfInterestLayer = new ol.layer.Vector({
      title: 'Points of Interrest',
      visible: false,
      source: featureSource(pointOfInterestFeatures),
      extent: projectionExtent,
    })

    const waypointLayer = new ol.layer.Vector({
      title: 'Waypoints',
      visible: false,
      source: featureSource(waypointFeatures),
      extent: projectionExtent,
    })

    const heartLayer = new ol.layer.Vector({
      title: 'Hearts',
      visible: false,
      source: featureSource(heartFeatures),
      extent: projectionExtent,
    })

    const heroPointLayer = new ol.layer.Vector({
      title: 'Hero Points',
      visible: false,
      source: featureSource(heroPointFeatures),
      extent: projectionExtent,
    })

    const iconLayers = new ol.layer.Group( {
      title: 'Icons',
      layers: [
        dungeonLayer,
        heroPointLayer,
        vistaLayer,
        heartLayer,
        waypointLayer,
        pointOfInterestLayer,
      ],
    })

    map.addLayer(iconLayers)
    map.addLayer(labelLayers)
  })
})
