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

// Graph representation with the distance weights
const graph = {
    "main-entrance": { "walkway": 40.97 },
    "walkway": { "main-entrance": 40.97, "gymnasium": 80.28, "oval-ee-1": 33.55, "lagoon-ee-1": 142.14 },
    "gymnasium": { "walkway": 80.28 },
    "oval-ee-1": { "walkway": 33.55, "oval-ee-2": 151.87 },
    "oval-ee-2": { "oval-ee-1": 151.87, "chapel": 45.9 },
    "chapel": { "oval-ee-2": 45.9, "east-wing": 62.51 },
    "east-wing": { "chapel": 62.51, "dome": 34.59 },
    "dome": { "east-wing": 34.59, "south-wing": 44.42, "west-wing": 38.79 },
    "south-wing": { "dome": 44.42 },
    "west-wing": { "dome": 38.79, "linear-park": 93.07 },
    "linear-park": { "west-wing": 93.07, "charlie": 51.64 },
    "charlie": { "linear-park": 51.64, "library": 26.7 },
    "library": { "charlie": 26.7, "lagoon-ee-3": 25.09 },
    "lagoon-ee-3": { "library": 25.09, "lagoon-ee-2": 36.98, "lagoon-ee-1": 91.51 },
    "lagoon-ee-2": { "lagoon-ee-3": 36.98, "lagoon-ee-1": 80.91, "dome": 41.46 },
    "lagoon-ee-1": { "lagoon-ee-3": 91.51, "lagoon-ee-2": 80.91, "walkway": 142.14 }
};

// Dijkstra Algorithm
function Dijkstra(graph, start, end) {
    const distances = {};
    const prev = {};
    const visited = new Set();
    const vertices = Object.keys(graph);

    // Initialize distances and previous vertices
    vertices.forEach(vertex => {
        distances[vertex] = Infinity;
        prev[vertex] = null;
    });
    distances[start] = 0;

    while (visited.size !== vertices.length) {
        let minVertex = null;
        vertices.forEach(vertex => {
            if (!visited.has(vertex) && (minVertex === null || distances[vertex] < distances[minVertex])) {
                minVertex = vertex;
            }
        });

        if (distances[minVertex] === Infinity) {
            break;
        }

        Object.keys(graph[minVertex]).forEach(neighbor => {
            if (!visited.has(neighbor)) {
                const alt = distances[minVertex] + graph[minVertex][neighbor];
                if (alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    prev[neighbor] = minVertex;
                }
            }
        });

        visited.add(minVertex);
    }

    const path = [];
    let vertex = end;
    while (vertex !== null) {
        path.unshift(vertex);
        vertex = prev[vertex];
    }

    return path[0] === start ? path : [];
}

// Display the results in text area
document.getElementById("calculate-btn").addEventListener("click", (event) => {
    event.preventDefault();
    const start = document.getElementById("start-point").value;
    const end = document.getElementById("end-point").value;

    if (!start || !end) {
        alert("Please select both start and end points.");
        return;
    }

    const path = Dijkstra(graph, start, end);
    const labeledPath = path.map(vertex => labels[vertex]);
    document.getElementById("result").value = labeledPath.join(" -> ");
});