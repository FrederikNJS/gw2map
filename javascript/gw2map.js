import Floor from 'javascript/floor'
import Zone from 'javascript/zone'
import { getContinents, getIcons, getFloor } from 'javascript/api'
import Immutable from 'immutable'
import ol from 'openlayers'

const attribution = new ol.Attribution({
  html: '<p><a href="https://github.com/FrederikNS/gw2map">The source code for this project</a> is released as ' +
  'open source under <a href="http://frederikns.github.io/gw2map/LICENSE.txt">the AGPL 3.0 license.</a></p>' +
  '<p>The graphical assets of the map and icons as well as the data is property of ArenaNet and subject to ' +
  'the following copyright:</p><p>"© 2014 ArenaNet, LLC. All rights reserved. NCSOFT, the interlocking NC l' +
  'ogo, ArenaNet, Guild Wars, Guild Wars Factions, Guild Wars Nightfall, Guild Wars: Eye of the North, Guil' +
  'd Wars 2, and all associated logos and designs are trademarks or registered trademarks of NCSOFT Corpora' +
  'tion. All other trademarks are the property of their respective owners."</p>'
})

const continentsPromise = getContinents()
const floorPromise = getFloor(1, 0)

continentsPromise.then(function(continents) {
  const tileSize = 256
  const projection = new ol.proj.Projection({
    code: 'ZOOMIFY',
    units: 'pixels',
    extent: [0, 0, continents.get(0).dimensions.get(0), continents.get(0).dimensions.get(1)]
  })
  const projectionExtent = projection.getExtent()
  const maxResolution = ol.extent.getWidth(projectionExtent) / tileSize
  const resolutions = Immutable.Range(0, 8).map(x=>maxResolution / Math.pow(2, x)).toJS()

  const map = new ol.Map({
    target: "map",
    layers : [
      new ol.layer.Tile({
        source: new ol.source.TileImage({
          attributions: [attribution],
          tileUrlFunction: function([z, x, y], pixelRatio, projection) {
            const tileMirror = 2 * (x % 2) - (y % 2) + 1
            return `https://tiles${tileMirror}.guildwars2.com/1/1/${z}/${x}/${-y - 1}.jpg`
          },
          projection: projection,
          tileGrid: new ol.tilegrid.TileGrid({
            origin: ol.extent.getTopLeft(projectionExtent),
            resolutions: resolutions,
            tileSize: tileSize
          })
        }),
        extent: projectionExtent
      })
    ],
    view: new ol.View({
      projection: projection,
      center: [16384, 16384],
      zoom: 2,
      minZoom: continents.getIn([0, 'min_zoom']),
      maxZoom: continents.getIn([0, 'max_zoom']),
      extent: projectionExtent
    })
  })

  floorPromise.then(function(floor) {
    const regionFeatures = floor.regions.map(region => region.olFeature)
    const zoneFeatures = floor.zones.map(zone => zone.olFeature)

    const regionLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: regionFeatures.toJS(),
        wrapX: false
      }),
      extent: projectionExtent,
      style: function(feature) {
        return [new ol.style.Style({
          text: new ol.style.Text({
            textAlign: "center",
            textBaseline: "middle",
            font: 'normal 0.8em sans-serif',
            text: feature.get('name'),
            fill: new ol.style.Fill({color: "#ffffff"}),
            stroke: new ol.style.Stroke({color: "#000000", width: 2}),
            offsetX: 0,
            offsetY: 0,
            rotation: 0
          })
        })]
      },
      minResolution: 16
    })

    const zoneLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: zoneFeatures.toJS(),
        wrapX: false
      }),
      extent: projectionExtent,
      style: function(feature) {
        return [new ol.style.Style({
          text: new ol.style.Text({
            textAlign: "center",
            textBaseline: "middle",
            font: 'normal 0.8em sans-serif',
            text: feature.get('name'),
            fill: new ol.style.Fill({color: "#ffff00"}),
            stroke: new ol.style.Stroke({color: "#000000", width: 2}),
            offsetX: 0,
            offsetY: 0,
            rotation: 0
          })
        })]
      },
      minResolution: 4,
      maxResolution: 32
    })

    map.addLayer(regionLayer)
    map.addLayer(zoneLayer)
  })
})
