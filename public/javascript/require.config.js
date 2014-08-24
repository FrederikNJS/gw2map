requirejs.config({
    paths: {
        leaflet: "/bower_components/leaflet-0.7.3/leaflet",
        jquery: "/bower_components/jquery/dist/jquery.min",
        q: "/bower_components/q/q"
    }
});

require(['leaflet', 'jquery'], function(leaflet, $) {
    "use strict";
    var attribution = "© 2014 ArenaNet, LLC. All rights reserved. NCSOFT, the interlocking NC logo, ArenaNet, Guild Wars, Guild Wars Factions, Guild Wars Nightfall, Guild Wars: Eye of the North, Guild Wars 2, and all associated logos and designs are trademarks or registered trademarks of NCSOFT Corporation. All other trademarks are the property of their respective owners.";
    var continents = $.getJSON("https://api.guildwars2.com/v1/continents.json");
    var floor = $.getJSON("https://api.guildwars2.com/v1/map_floor.json?continent_id=1&floor=1");
    var map_parts = $.getJSON("https://api.guildwars2.com/v1/maps.json");
    var realMaps = [15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 39, 50, 51, 53, 54, 62,
        65, 73, 91, 139, 326, 873, 988];
    //var falseMaps = [33, 38, 63, 66, 67, 70, 75, 81, 94, 95, 96, 111, 112, 211, 336, 350, 536, 549, 554, 698, 776, 795, 807, 864, 865, 872, 875, 877, 894, 897, 900, 918, 919, 929, 935, 936, 940, 955, 956, 957, 968, 984];

    continents.done(function(continents) {
        var selectedContinent = 1;
        var startFloor = 0;
        //continents.continents[selectedContinent].floors
        var baseLayers = {};
        [0,1,2,3].forEach(function(floor_id) {
            baseLayers[floor_id] = leaflet.tileLayer('https://tiles{s}.guildwars2.com/{continent}/{floor}/{z}/{x}/{y}.jpg', {
                attribution: attribution,
                minZoom: 2,
                maxZoom: 7,
                continuousWorld: true,
                subdomains: [1, 2, 3, 4 ],
                floor: floor_id,
                continent: selectedContinent,
                detectRetina: true
            });
        });
        var overlayLayers = {};
        overlayLayers['regions'] = leaflet.layerGroup();
        overlayLayers['zones'] = leaflet.layerGroup();
        overlayLayers['sectors'] = leaflet.layerGroup();

        var map = leaflet.map('map', {
            crs: leaflet.CRS.Simple,
            layers: [baseLayers[startFloor]]
        });


        leaflet.control.layers(baseLayers, overlayLayers).addTo(map);
        var boundaries = new leaflet.LatLngBounds(map.unproject([0, 32768], map.getMaxZoom()), map.unproject([32768, 0], map.getMaxZoom()));
        map.setView(map.unproject([32768/2, 32768/2], map.getMaxZoom()), 3);
        map.setMaxBounds(boundaries);

        //Draw Regions
        floor.done(function(floors) {
            $.each(floors.regions, function(id, region) {
                leaflet.marker(map.unproject([region.label_coord[0], region.label_coord[1]], map.getMaxZoom()), {
                    title: region.name
                }).bindPopup(region.name).addTo(overlayLayers['regions']);

                var already_drawn = {};
                $.each(region.maps, function(id, zone) {
                    var xCoord = (zone.continent_rect[0][0]+zone.continent_rect[1][0]) / 2;
                    var yCoord = (zone.continent_rect[0][1]+zone.continent_rect[1][1]) / 2;
                    if(!already_drawn[xCoord+","+yCoord]) {
                        already_drawn[xCoord+","+yCoord] = true;
                        if(realMaps.indexOf(parseInt(id)) !== -1) {
                            leaflet.marker(map.unproject([xCoord, yCoord], map.getMaxZoom()), {
                                title: zone.name
                            }).bindPopup(zone.name).addTo(overlayLayers['zones']);

                            $.each(zone.sectors, function(index, sector) {
                                leaflet.marker(map.unproject([sector.coord[0], sector.coord[1]], map.getMaxZoom()), {
                                    title: sector.name + " (" + sector.level + ")"
                                }).bindPopup(sector.name + " (" + sector.level + ")").addTo(overlayLayers['sectors']);
                            });
                        }
                    }
                });
            });
        });
    });
});
