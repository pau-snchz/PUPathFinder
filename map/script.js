// Map
var map = L.map('map').setView([14.59782, 121.01139], 17);

// Map Tile
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Option values and their labels
const labels = {
    "main-entrance": "Main Entrance",
    "walkway": "Walkway",
    "gymnasium": "Gymnasium and Sports Center",
    "oval-ee-1": "Track and Football Oval Entrance/Exit 1",
    "oval-ee-2": "Track and Football Oval Entrance/Exit 2",
    "chapel": "Interfaith Chapel",
    "lagoon-ee-1": "Lagoon Entrance/Exit 1",
    "lagoon-ee-2": "Lagoon Entrance/Exit 2",
    "lagoon-ee-3": "Lagoon Entrance/Exit 3",
    "east-wing": "East Wing",
    "west-wing": "West Wing",
    "south-wing": "South Wing",
    "dome": "Dome",
    "linear-park": "Linear Park",
    "charlie": "Charlie del Rosario Hall",
    "library": "Ninoy Aquino Library and Learning Resources Center"
};

let markers = {};

// Map Markers
const locations = [
    { name: "main-entrance", coords: [14.59915, 121.01184] },
    { name: "walkway", coords: [14.5988, 121.01151] },
    { name: "gymnasium", coords: [14.59945, 121.01097] },
    { name: "oval-ee-1", coords: [14.59882, 121.012] },
    { name: "oval-ee-2", coords: [14.59746, 121.01181] },
    { name: "chapel", coords: [14.59714, 121.01144] },
    { name: "lagoon-ee-1", coords: [14.59794, 121.01065] },
    { name: "lagoon-ee-2", coords: [14.5972, 121.01057] },
    { name: "lagoon-ee-3", coords: [14.59733, 121.01001] },
    { name: "east-wing", coords: [14.59671, 121.0111] },
    { name: "west-wing", coords: [14.59689, 121.0104] },
    { name: "south-wing", coords: [14.59654, 121.01067] },
    { name: "dome", coords: [14.59698, 121.01078] },
    { name: "linear-park", coords: [14.59684, 121.00939] },
    { name: "charlie", coords: [14.59716, 121.00988] },
    { name: "library", coords: [14.59773, 121.0097] }
];

locations.forEach(loc => {
    markers[loc.name] = L.marker(loc.coords, { title: labels[loc.name] }).addTo(map);
});

// Graph representation with the distance weights
const graph = {
    "main-entrance": { "walkway": 40.97 },
    "walkway": { "main-entrance": 40.97, "gymnasium": 80.28, "oval-ee-1": 33.55, "lagoon-ee-1": 142.14 },
    "gymnasium": { "walkway": 80.28 },
    "oval-ee-1": { "walkway": 33.55, "oval-ee-2": 151.87 },
    "oval-ee-2": { "oval-ee-1": 151.87, "chapel": 45.9 },
    "chapel": { "oval-ee-2": 45.9, "east-wing": 62.51 },
    "east-wing": { "chapel": 62.51, "dome": 34.59 },
    "dome": { "east-wing": 34.59, "south-wing": 44.42, "west-wing": 38.79, "lagoon-ee-3": 95.33, "charlie": 101.31 },
    "south-wing": { "dome": 44.42 },
    "west-wing": { "dome": 38.79, "linear-park": 93.07, "charlie": 64.98, "lagoon-ee-3": 70.24 },
    "linear-park": { "west-wing": 93.07, "charlie": 51.64 },
    "charlie": { "dome": 101.31, "linear-park": 51.64, "library": 26.7, "west-wing": 64.98, "lagoon-ee-3": 24.78 },
    "library": { "charlie": 26.7, "lagoon-ee-3": 25.09 },
    "lagoon-ee-3": { "dome": 95.33, "west-wing": 70.24, "charlie": 24.78, "library": 25.09, "lagoon-ee-2": 36.98, "lagoon-ee-1": 91.51 },
    "lagoon-ee-2": { "lagoon-ee-3": 36.98, "lagoon-ee-1": 80.91, "dome": 41.46 },
    "lagoon-ee-1": { "lagoon-ee-3": 91.51, "lagoon-ee-2": 80.91, "walkway": 142.14 }
};

for (let node in graph) {
    for (let neighbor in graph[node]) {
        if (!graph[neighbor]) {
            graph[neighbor] = {};
        }
        graph[neighbor][node] = graph[node][neighbor];
    }
}

// Dijkstra Algorithm
function Dijkstra(graph, start, end) {
    const vertices = Object.keys(graph);
    const distances = {};
    const previous = {};
    const unvisited = new Set(vertices);

    // Initialize distances
    for (let vertex of vertices) {
        distances[vertex] = vertex === start ? 0 : Infinity;
        previous[vertex] = null;
    }

    while (unvisited.size > 0) {
        let current = null;
        for (let vertex of unvisited) {
            if (current === null || distances[vertex] < distances[current]) {
                current = vertex;
            }
        }

        if (distances[current] === Infinity) break;

        if (current === end) break;

        unvisited.delete(current);

        for (let neighbor in graph[current]) {
            let alt = distances[current] + graph[current][neighbor];
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                previous[neighbor] = current;
            }
        }
    }

    const path = [];
    let current = end;
    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }

    return { path: path[0] === start ? path : [], distance: distances[end] };
}

let routePolyline;

// Draw map route
function drawRoute(path) {
    if (routePolyline) {
        map.removeLayer(routePolyline);
    }

    const coordinates = path.map(location => markers[location].getLatLng());

    routePolyline = L.polyline(coordinates, {color: 'red', weight: 3}).addTo(map);

    map.fitBounds(routePolyline.getBounds(), {padding: [50, 50]});
}

// Display the route
document.getElementById("calculate-btn").addEventListener("click", (event) => {
    event.preventDefault();
    const start = document.getElementById("start-point").value;
    const end = document.getElementById("end-point").value;

    if (!start || !end) {
        alert("Please input your location and destination.");
        return;
    }

    const result = Dijkstra(graph, start, end);
    if (result.path.length > 0) {
        drawRoute(result.path);
        console.log(`Total distance: ${result.distance.toFixed(2)} meters`);
    } else {
        alert("No path found between the selected points.");
    }
});