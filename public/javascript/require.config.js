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

    continents.done(function(continents) {
        var selectedContinent = 1;
        var startFloor = 1;
        //continents.continents[selectedContinent].floors
        var layers = {};
        [1,2,3].forEach(function(floor_id) {
            layers[floor_id] = leaflet.tileLayer('https://tiles{s}.guildwars2.com/{continent}/{floor}/{z}/{x}/{y}.jpg', {
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

        var map = leaflet.map('map', {
            crs: leaflet.CRS.Simple,
            layers: [layers[startFloor]]
        });
        leaflet.control.layers(layers).addTo(map);
        var boundaries = new leaflet.LatLngBounds(map.unproject([0, 32768], map.getMaxZoom()), map.unproject([32768, 0], map.getMaxZoom()));
        map.setView(map.unproject([32768/2, 32768/2], map.getMaxZoom()), 3);
        map.setMaxBounds(boundaries);

        floor.done(function(floors) {
            $.each(floors.regions, function(id, region) {
                leaflet.marker(map.unproject([region.label_coord[0], region.label_coord[1]], map.getMaxZoom()), {
                    title: region.name
                }).addTo(map);
            });
        });
    });
});
