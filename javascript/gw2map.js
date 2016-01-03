import Floor from 'javascript/floor'
import Zone from 'javascript/zone'
import { getContinents, getIcons, getFloor } from 'javascript/api'

var attribution = new ol.Attribution({
  html: '<p><a href="https://github.com/FrederikNS/gw2map">The source code for this project</a> is released as ' +
  'open source under <a href="http://frederikns.github.io/gw2map/LICENSE.txt">the AGPL 3.0 license.</a></p>' +
  '<p>The graphical assets of the map and icons as well as the data is property of ArenaNet and subject to ' +
  'the following copyright:</p><p>"© 2014 ArenaNet, LLC. All rights reserved. NCSOFT, the interlocking NC l' +
  'ogo, ArenaNet, Guild Wars, Guild Wars Factions, Guild Wars Nightfall, Guild Wars: Eye of the North, Guil' +
  'd Wars 2, and all associated logos and designs are trademarks or registered trademarks of NCSOFT Corpora' +
  'tion. All other trademarks are the property of their respective owners."</p>'
});

var continentsPromise = getContinents()

var tileUrl = 'https://tiles{s}.guildwars2.com/1/1/{z}/{x}/{y}.jpg';

continentsPromise.then(function(continents) {
  getFloor(1, 0).then(function(floor) {
    var tileSize = 256;
    var projection = new ol.proj.Projection({
      code: 'ZOOMIFY',
      units: 'pixels',
      extent: [0, 0, continents.getIn([0, 'continent_dims', 0]), continents.getIn([0, 'continent_dims', 1])]
    });
    var projectionExtent = projection.getExtent();
    var maxResolution = ol.extent.getWidth(projectionExtent) / tileSize;
    var resolutions = [];
    for(var z = 0; z <= 8; z++) {
      resolutions[z] = maxResolution / Math.pow(2, z)
    }

    var map = new ol.Map({
      target: "map",
      layers : [
        new ol.layer.Tile({
          source: new ol.source.TileImage({
            attributions: [attribution],
            tileUrlFunction: function(tileCoord, pixelRatio, projection) {
              var xEven = tileCoord[1] % 2;
              var yEven = (-tileCoord[2] - 1) % 2;
              return tileUrl.replace('{s}', (2 * xEven + yEven + 1).toString())
              .replace('{z}', tileCoord[0].toString())
              .replace('{x}', tileCoord[1].toString())
              .replace('{y}', (-tileCoord[2] - 1).toString());
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
    });

    map.getView().on('change:resolution', function() {
      console.log(map.getView().getResolution())
    });

    function flipCoordinate(coord) {
      return Immutable.List([coord.get(0), continents.getIn([0, 'continent_dims', 1]) - coord.get(1)]);
    }

    function getCenterOfRect(rect) {
      return Immutable.List([
        (rect.getIn([0, 0]) + rect.getIn([1, 0])) / 2,
        (rect.getIn([0, 1]) + rect.getIn([1, 1])) / 2
      ]);
    }

    var regions = Immutable.Map(floor.get('regions'));
    var zones = regions.map(x=>x.get('maps'))
      .reduce((res, val)=>res.merge(val), Immutable.Map())
      .filter(x=>!(Zone.falseZones().has(x.get('id'))));

    var regionFeatures = regions.map(function(region, regionId) {
      return new ol.Feature({
        geometry: new ol.geom.Point(flipCoordinate(region.get('label_coord')).toJS()),
        name: region.get('name')
      });
    }).valueSeq();

    var zoneFeatures = zones.map(function(zone) {
      return new ol.Feature({
        geometry: new ol.geom.Point(flipCoordinate(getCenterOfRect(zone.get('continent_rect'))).toJS()),
        name: zone.get('name')
      })
    }).valueSeq();

    var regionLayer = new ol.layer.Vector({
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
    });

    var zoneLayer = new ol.layer.Vector({
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
    });

    map.addLayer(regionLayer);
    map.addLayer(zoneLayer)
  }).catch(function(e, response) {
    console.error(e)
  })

}).catch(function(e, response) {
  console.error(e)
});
