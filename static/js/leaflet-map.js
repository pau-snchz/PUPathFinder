// Map
var map = L.map('map').setView([14.59782, 121.01139], 17);

// Map Tile
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let markers = {};

// Map Markers
const locations = [
    { name: "main-entrance", coords: [14.59915, 121.01184] },
    { name: "gymnasium", coords: [14.59945, 121.01097] },
    { name: "outdoor", coords: [14.59879, 121.01066] },
    { name: "oval-ee-1", coords: [14.59882, 121.012] },
    { name: "oval-ee-2", coords: [14.59736, 121.01181] },
    { name: "pool", coords: [14.59852, 121.01031] },
    { name: "pe-bldg", coords: [14.59839, 121.01023] },
    { name: "chapel", coords: [14.59714, 121.01144] },
    { name: "nutrition", coords: [14.5969, 121.01168] },
    { name: "lagoon-ee-1", coords: [14.59794, 121.01065] },
    { name: "lagoon-ee-2", coords: [14.5972, 121.01057] },
    { name: "lagoon-ee-3", coords: [14.59735, 121.01005] },
    { name: "amphitheater", coords: [14.5974, 121.0104] },
    { name: "east-wing", coords: [14.59676, 121.01114] },
    { name: "west-wing", coords: [14.59696, 121.01038] },
    { name: "south-wing", coords: [14.59654, 121.01067] },
    { name: "dome", coords: [14.59689, 121.01076] },
    { name: "linear-1", coords: [14.59679, 121.00944] },
    { name: "linear-2", coords: [14.59656, 121.00993] },
    { name: "ferry", coords: [14.59613, 121.01094] },
    { name: "charlie", coords: [14.59716, 121.00988] },
    { name: "ninoy", coords: [14.59773, 121.0097] },
    { name: "lab-school", coords: [14.59769, 121.00907] },
    { name: "ex1", coords: [14.59883, 121.01151] },
    { name: "ex2", coords: [14.59926, 121.01114] },
    { name: "ex3", coords: [14.59826, 121.01089] },
    { name: "ex4", coords: [14.59805, 121.01136] },
    { name: "ex5", coords: [14.59852, 121.01164] },
    { name: "ex6", coords: [14.59861, 121.01235] },
    { name: "ex7", coords: [14.59762, 121.01174] },
    { name: "ex8", coords: [14.59761, 121.01245] },
    { name: "ex9", coords: [14.59822, 121.01064] },
    { name: "ex10", coords: [14.59835, 121.01038] },
    { name: "ex11", coords: [14.59804, 121.0109] },
    { name: "ex12", coords: [14.59719, 121.01171] },
    { name: "ex13", coords: [14.59683, 121.01152] },
    { name: "ex14", coords: [14.59715, 121.01045] },
    { name: "ex15", coords: [14.59721, 121.01024] },
    { name: "ex16", coords: [14.59708, 121.01038] },
    { name: "ex17", coords: [14.59724, 121.01011] },
    { name: "ex18", coords: [14.59754, 121.0096] },
    { name: "ex19", coords: [14.59742, 121.00985] },
    { name: "ex20", coords: [14.59767, 121.00935] },
    { name: "ex21", coords: [14.59696, 121.01] },
    { name: "ex22", coords: [14.59687, 121.01003] },
    { name: "ex23", coords: [14.5965, 121.01027] },
    { name: "ex24", coords: [14.59625, 121.01103] },
    { name: "ex25", coords: [14.59713, 121.01065] },
    { name: "ex26", coords: [14.59704, 121.01066] },
    { name: "ex27", coords: [14.59697, 121.01092] },
    { name: "ex28", coords: [14.59654, 121.01135] },
];

const hiddenMarkers = [
    "ex1", "ex2", "ex3", "ex4", "ex5", "ex6", "ex7", "ex8", "ex9", "ex10",
    "ex11", "ex12", "ex13", "ex14", "ex15", "ex16", "ex17", "ex18", "ex19", "ex20",
    "ex21", "ex22", "ex23", "ex24", "ex25", "ex26", "ex27", "ex28",
]; 

locations.forEach(loc => {
    markers[loc.name] = L.marker(loc.coords, { 
        title: window.graphData.labels[loc.name]
    });

    if (!hiddenMarkers.includes(loc.name)) {
        markers[loc.name].addTo(map)
            .bindTooltip(window.graphData.labels[loc.name], {
                direction: 'bottom',
                offset: [0, 10],
                className: 'location-label',
                opacity: 0.8,
            });
    }
});

let routePolyline;

// Draw map route
function drawRoute(path) {
    if (routePolyline) {
        map.removeLayer(routePolyline);
    }

    const coordinates = path.map(location => markers[location].getLatLng());
    routePolyline = L.polyline(coordinates, {color: '#880015', weight: 3}).addTo(map);
    map.fitBounds(routePolyline.getBounds(), {padding: [50, 50]});
}

window.mapData = {
    map,
    markers,
    drawRoute
};