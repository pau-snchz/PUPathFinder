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

window.Dijkstra = Dijkstra;