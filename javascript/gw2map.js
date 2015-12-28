var attribution = new ol.Attribution({
    html: '<p><a href="https://github.com/FrederikNS/gw2map">The source code for this project</a> is released as ' +
    'open source under <a href="http://frederikns.github.io/gw2map/LICENSE.txt">the AGPL 3.0 license.</a></p>' +
    '<p>The graphical assets of the map and icons as well as the data is property of ArenaNet and subject to ' +
    'the following copyright:</p><p>"© 2014 ArenaNet, LLC. All rights reserved. NCSOFT, the interlocking NC l' +
    'ogo, ArenaNet, Guild Wars, Guild Wars Factions, Guild Wars Nightfall, Guild Wars: Eye of the North, Guil' +
    'd Wars 2, and all associated logos and designs are trademarks or registered trademarks of NCSOFT Corpora' +
    'tion. All other trademarks are the property of their respective owners."</p>'
});

const falseMaps = Immutable.Set([37, 55, 61, 77, 79, 80, 89, 92, 97, 110,
    113, 120, 138, 140, 142, 143, 144, 145, 147, 148, 149, 152, 153, 154,
    157, 159, 161, 162, 163, 171, 172, 178, 179, 180, 182, 184, 185, 186,
    190, 191, 192, 193, 195, 196, 198, 199, 201, 202, 203, 211, 212, 215,
    216, 217, 222, 224, 225, 226, 232, 234, 237, 238, 239, 242, 244, 248,
    249, 250, 251, 252, 254, 255, 256, 257, 258, 259, 260, 262, 263, 264,
    267, 269, 271, 272, 274, 275, 276, 282, 283, 284, 287, 288, 290, 294,
    330, 327, 334, 363, 364, 365, 371, 372, 373, 374, 375, 376, 378, 379,
    380, 381, 382, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 396,
    397, 399, 400, 401, 405, 407, 410, 411, 412, 413, 414, 415, 416, 417,
    418, 419, 420, 421, 422, 423, 424, 425, 427, 428, 429, 430, 434, 435,
    436, 439, 440, 441, 444, 447, 449, 453, 454, 455, 458, 459, 460, 464,
    465, 466, 470, 471, 474, 476, 477, 480, 481, 483, 485, 487, 488, 490,
    492, 497, 498, 499, 502, 503, 504, 505, 507, 509, 511, 512, 513, 514,
    515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 527, 528, 529,
    532, 533, 534, 535, 536, 537, 538, 539, 540, 542, 543, 544, 545, 546,
    547, 548, 552, 556, 557, 558, 559, 560, 561, 563, 564, 567, 569, 570,
    571, 573, 574, 575, 576, 577, 578, 579, 581, 582, 583, 584, 586, 587,
    588, 589, 590, 591, 592, 594, 595, 596, 597, 598, 599, 606, 607, 608,
    609, 610, 611, 613, 614, 617, 618, 620, 621, 622, 623, 624, 625, 628,
    629, 630, 631, 634, 635, 636, 638, 642, 643, 644, 645, 648, 649, 650,
    651, 652, 653, 655, 656, 657, 659, 662, 663, 664, 666, 667, 668, 669,
    670, 672, 673, 674, 675, 676, 677, 678, 680, 681, 682, 683, 684, 685,
    686, 687, 691, 692, 693, 694, 698, 700, 703, 706, 707, 708, 709, 710,
    711, 712, 713, 714, 715, 719, 726, 727, 728, 729, 730, 731, 732, 733,
    735, 736, 737, 738, 739, 743, 744, 745, 746, 747, 750, 751, 758, 760,
    761, 762, 763, 767, 768, 769, 772, 775, 777, 778, 779, 781, 783, 784,
    785, 786, 787, 788, 790, 792, 793, 797, 799, 806, 807, 820, 821, 825,
    827, 828, 830, 833, 845, 849, 905, 914, 938, 939, 980, 989, 990, 991,
    992, 993, 994, 997, 999, 1000, 1001, 1002, 1003, 1004, 1005, 1006,
    1007, 1009, 1010, 1016, 1017, 1018, 1021, 1022, 1023, 1024, 1025, 1026,
    1027, 1028, 1029, 1032, 1033, 1037, 1048, 1050, 1051, 1054, 1058, 1062,
    1063, 1064, 1065, 1066, 1067, 1069, 1070, 1071, 1072, 1073, 1074, 1076,
    1079, 1080, 1081, 1082, 1083, 1084, 1087, 1088, 1089, 1090, 1092, 1094,
    1095, 1097, 1098, 1100, 1101, 1104, 1106, 1107, 1108, 1109, 1110, 1113,
    1115, 1117, 1121, 1122, 1123, 1124, 1125, 1128, 1129, 1130, 1133, 1134,
    1135, 1136, 1137, 1139, 1140, 1142, 1144, 1146]);

var continentsPromise = axios.get('https://api.guildwars2.com/v2/continents', {params: {ids: 'all'}})
    .then(x => x.data)
    .then(Immutable.fromJS);

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
    var floor = axios.get('https://api.guildwars2.com/v2/continents/1/floors/0')
        .then(floorResponse => floorResponse.data)
        .then(Immutable.fromJS)

    floor.then(function(floor) {
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
                           .filter(x=>!falseMaps.has(x.get('id')));

        var regionFeatures = regions.map(function(region, regionId) {
            return new ol.Feature({
                geometry: new ol.geom.Point(flipCoordinate(region.get('label_coord')).toJS()),
                name: region.name
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
            // minResolution: 16
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
                        fill: new ol.style.Fill({color: "#ffffff"}),
                        stroke: new ol.style.Stroke({color: "#000000", width: 2}),
                        offsetX: 0,
                        offsetY: 0,
                        rotation: 0
                    })
                })]
            },
            // minResolution: 16
        });

        map.addLayer(regionLayer);
        map.addLayer(zoneLayer)
    }).catch(function(e, response) {
        console.error(e)
    })

}).catch(function(e, response) {
    console.error(e)
});
