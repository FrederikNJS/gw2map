(function () {
    "use strict";
    var attribution = new ol.Attribution({
        html: '<p><a href="https://github.com/FrederikNS/gw2map">The source code for this project</a> is released as ' +
            'open source under <a href="http://frederikns.github.io/gw2map/LICENSE.txt">the AGPL 3.0 license.</a></p>' +
            '<p>The graphical assets of the map and icons as well as the data is property of ArenaNet and subject to ' +
            'the following copyright:</p><p>"© 2014 ArenaNet, LLC. All rights reserved. NCSOFT, the interlocking NC l' +
            'ogo, ArenaNet, Guild Wars, Guild Wars Factions, Guild Wars Nightfall, Guild Wars: Eye of the North, Guil' +
            'd Wars 2, and all associated logos and designs are trademarks or registered trademarks of NCSOFT Corpora' +
            'tion. All other trademarks are the property of their respective owners."</p>'
    });

    var continentsPromise = axios.get('https://api.guildwars2.com/v2/continents', {params: {ids: 'all'}}).then(x => x.data);
    var falseMaps = Immutable.Set[589, 711, 807, 905, 1005];
    var falseDungeons = Immutable.Set[1822, 1935, 1936, 1937, 1938];

    var iconStyles = Immutable.Map({
        'waypoint': {
            src: 'https://render.guildwars2.com/file/32633AF8ADEA696A1EF56D3AE32D617B10D3AC57/157353.png',
            scale: 1
        },
        'dungeon': {
            src: 'https://render.guildwars2.com/file/943538394A94A491C8632FBEF6203C2013443555/102478.png',
            scale: 1
        },
        'heart': {
            src: 'https://render.guildwars2.com/file/09ACBA53B7412CC3C76E7FEF39929843C20CB0E4/102440.png',
            scale: 1
        },
        'poi': {
            src: 'https://render.guildwars2.com/file/25B230711176AB5728E86F5FC5F0BFAE48B32F6E/97461.png',
            scale: 0.5
        },
        'heropoint': {
            src: 'http://wiki.guildwars2.com/images/4/44/Hero_point.png',
            scale: 1
        },
        'vista': {
            src: 'http://wiki.guildwars2.com/images/d/d9/Vista.png',
            scale: 1
        }
    }).map(function (value) {
        return new ol.style.Style({
            image: new ol.style.Icon(value)
        });
    });

    var tileUrl = 'https://tiles{s}.guildwars2.com/1/1/{z}/{x}/{y}.jpg';

    continentsPromise.then(function(continents) {
        var floor = axios.get('https://api.guildwars2.com/v2/continents/1/floors/0').then(x => x.data);

        floor.then(function(floor) {
            var tileSize = 256;
            var projection = new ol.proj.Projection({
                code: 'ZOOMIFY',
                units: 'pixels',
                extent: [0, 0, continents[0].continent_dims[0], continents[0].continent_dims[1]]
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
                    minZoom: continents[0].min_zoom,
                    maxZoom: continents[0].max_zoom,
                    extent: projectionExtent
                })
            });

            map.getView().on('change:resolution', function() {
                console.log(map.getView().getResolution())
            });

            function flipCoordinate(coord) {
                return [coord[0], continents[0].continent_dims[1] - coord[1]]
            }

            function getCenterOfRect(rect) {
                return [
                    (rect[0][0] + rect[1][0]) / 2,
                    (rect[0][1] + rect[1][1]) / 2
                ];
            }

            var regionFeatures = Immutable.Map(floor.regions).map(function(region, regionId) {
                return new ol.Feature({
                    geometry: new ol.geom.Point(flipCoordinate(region.label_coord)),
                    name: region.name
                });
            }).toList().flatten().toJS();

            var zoneFeatures = Immutable.Map(floor.regions).map(function(region) {
                return Immutable.Map(region.maps).map(function(zone) {
                    return new ol.Feature({
                        geometry: new ol.geom.Point(flipCoordinate(getCenterOfRect(zone.continent_rect))),
                        name: zone.name
                    })
                })
            }).toList().flatten().toJS();

            var regionLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: regionFeatures,
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
                            fill: new ol.style.Fill({color: "#aa3300"}),
                            stroke: new ol.style.Stroke({color: "#ffffff", width: 3}),
                            offsetX: 0,
                            offsetY: 0,
                            rotation: 0
                        })
                    })]
                },
                // minResolution: 16
            });

            var zoneLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: zoneFeatures,
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
                            fill: new ol.style.Fill({color: "#aa3300"}),
                            stroke: new ol.style.Stroke({color: "#ffffff", width: 3}),
                            offsetX: 0,
                            offsetY: 0,
                            rotation: 0
                        })
                    })]
                },
                minResolution: 16
            });

            map.addLayer(regionLayer);
            map.addLayer(zoneLayer)
        }).catch(function(e, response) {
            console.error(e)
        })

    }).catch(function(e, response) {
        console.error(e)
    });
})();
