// Option values and their labels
const labels = {
    "main-entrance": "Main Entrance",
    "gymnasium": "Gymnasium and Sports Center",
    "outdoor": "Outdoor Court",
    "oval-ee-1": "Track and Football Oval Entrance/Exit 1",
    "oval-ee-2": "Track and Football Oval Entrance/Exit 2",
    "pool": "Swimming Pool",
    "pe-bldg": "Physical Education Building",
    "chapel": "Interfaith Chapel",
    "nutrition": "Nutrition and Food Science Building",
    "lagoon-ee-1": "Lagoon Entrance/Exit 1",
    "lagoon-ee-2": "Lagoon Entrance/Exit 2",
    "lagoon-ee-3": "Lagoon Entrance/Exit 3",
    "amphitheater": "Amphitheater",
    "east-wing": "East Wing",
    "west-wing": "West Wing",
    "south-wing": "South Wing",
    "dome": "Dome",
    "linear-1": "Linear Park 1",
    "linear-2": "Linear Park 2",
    "ferry": "PUP Sta. Mesa Ferry Station",
    "charlie": "Charlie del Rosario Hall",
    "ninoy": "Ninoy Aquino Library and Learning Resources Center",
    "lab-school": "Laboratory High School"
};

// Graph representation with the distance weights
const graph = {
    "main-entrance": { "ex1": 40.97, },
    "ex1": { "main-entrance": 40.97, "ex2": 50.08, "ex3": 100.53, "oval-ee-1": 41.59, "ex4": 72.87, },
    "ex2": { "ex1": 50.08, "gymnasium": 33.62, "outdoor": 69.95, },
    "gymnasium": { "ex2": 33.62, },
    "outdoor": { "ex2": 69.95, "pool": 58.11, },
    "pool": { "outdoor": 58.11, "pe-bldg": 15.77, "ex10": 17.12, },
    "pe-bldg": { "pool": 15.77, "ex10": 15.8, },
    "ex10": { "pool": 17.12, "pe-bldg": 15.8, "ex9": 34.38, },
    "ex9": { "ex10": 34.38, "ex3": 24.24, "lagoon-ee-1": 31.22, },
    "ex3": { "ex9": 24.24, "ex1": 100.53, "ex11": 22.82, },
    "lagoon-ee-1": { "ex9": 31.22, "ex11": 24.1, "amphitheater": 61.33, "lagoon-ee-2": 75.79, },
    "oval-ee-1": { "ex1": 41.59, "ex5": 51.13, "ex6": 53.85, },
    "ex5": { "oval-ee-1": 51.13, "ex7": 96.16, },
    "ex6": { "oval-ee-1": 53.85, "ex8": 109.67, },
    "ex8": { "ex6": 109.67, "oval-ee-2": 80.21, },
    "oval-ee-2": { "ex8": 80.21, "ex7": 30.79, "ex12": 12.44, },
    "ex7": { "oval-ee-2": 30.79, "ex5": 96.16, }, 
    "ex12": { "oval-ee-2": 12.44, "chapel": 28.76, "nutrition": 42.46, "ex13": 43.37,  "ex4": 100.05, },
    "chapel": { "ex12": 28.76, "ex13": 26.31, "nutrition": 33.89, },
    "nutrition": { "ex12": 42.46, "ex13": 22.07, "chapel": 33.89, },
    "ex13": { "ex12": 43.37, "chapel": 26.31, "nutrition": 22.07, "east-wing": 41.99, "ex28": 40.63, },
    "ex4": { "ex12": 100.05, "ex1": 72.87,},
    "east-wing": { "ex13": 41.99, "ex27": 32.63, "ex28": 30.26, },
    "ex24": { "ex28": 45.64, "ex23": 85.38, "ferry": 9.07, },
    "ex27": { "dome": 17.83, "east-wing": 32.63, },
    "dome": { "ex27": 17.83, "ex26": 17.83, "south-wing": 32.63, },
    "south-wing": { "dome": 32.63, },
    "ex26": { "dome": 17.83, "west-wing": 32.63, "ex25": 9.83, },
    "west-wing": { "ex26": 32.63, "ex22": 38.54, },
    "ex25": { "ex26": 9.83, "lagoon-ee-2": 20.25, "ex16": 36.05, },
    "ex16": { "ex25": 36.05, "ex21": 36.38, "ex17": 33.16, },
    "ex22": { "west-wing": 38.54, "ex23": 48.98, "linear-2": 31.47, "ex21": 11.98, },
    "ex21": { "ex16": 36.05, "ex22": 11.98, "charlie": 25.64, "linear-1": 54.5, },
    "linear-1": { "ex21": 54.5, "linear-2": 56.41, },
    "linear-2": { "ex22": 31.47, "linear-1": 56.41, },
    "ex23": { "ex22": 48.98, "ex24": 85.38, },
    "ferry": { "ex24": 9.07, },
    "lagoon-ee-2": { "ex25": 20.25, "amphitheater": 27.45, "ex14": 21.27, "lagoon-ee-1": 75.79, },
    "amphitheater": { "lagoon-ee-2": 27.45, "lagoon-ee-1": 61.33, "ex15": 27.45, },
    "ex15": { "amphitheater": 27.45, "ex14": 21.27, "lagoon-ee-3": 23.63, },
    "ex14": { "lagoon-ee-2": 21.27, "ex15": 21.27, },
    "lagoon-ee-3": { "ex15": 23.63, "ex17": 14.39, "ex19": 20.96, },
    "ex17": { "lagoon-ee-3": 14.39, "ex16": 33.16, "charlie": 18.82, "ex19": 33.38, },
    "ex18": { "ex19": 33.12, "ex20": 33.12, "ninoy": 21.16, },
    "ex19": { "lagoon-ee-3": 20.96, "charlie": 28.27, "ninoy": 38.43, "ex18": 33.12, "ex17": 33.38, },
    "charlie": { "ex19": 28.27, "ex17": 18.82, "ex21": 25.64, },
    "ninoy": { "ex19": 38.43, "ex18": 21.16, "ex20": 38.43, },
    "ex20": { "ninoy": 38.43, "ex18": 33.12, "lab-school": 21.42, },
    "lab-school": { "ex20": 21.42, },
    "ex28": { "east-wing": 30.26, "ex13": 40.63, "ex24": 45.64, },
};

for (let node in graph) {
    for (let neighbor in graph[node]) {
        if (!graph[neighbor]) {
            graph[neighbor] = {};
        }
        graph[neighbor][node] = graph[node][neighbor];
    }
}

window.graphData = {
    labels,
    graph,
}