import fs from 'fs';

const input = fs.readFileSync('./08/input2.txt').toString();

interface JunctionBox {
    id: number;
    x: number;
    y: number;
    z: number;
};

const junctionBoxes = input.split('\n').map((line, id) => {
    const coord = line.split(',').map(Number);
    return { id: id + 1, x: coord[0], y: coord[1], z: coord[2] };
});

function calculateEuclideanDistance(boxA: { x: number; y: number; z: number }, boxB: { x: number; y: number; z: number }): number {
    const dx = boxA.x - boxB.x;
    const dy = boxA.y - boxB.y;
    const dz = boxA.z - boxB.z;
    return Math.round(Math.sqrt(dx * dx + dy * dy + dz * dz) * 100) / 100;
}

function getAllDistances(boxes: JunctionBox[]) {
    const distances = new Map<string, number>();
    for (const box of boxes) {
        for (const otherBox of boxes) {
            if (box.id === otherBox.id) continue;
            if (distances.has(`${otherBox.id}-${box.id}`)) continue; // Avoid duplicate calculations
            const distance = calculateEuclideanDistance(box, otherBox);
            const key = `${box.id}-${otherBox.id}`;
            distances.set(key, distance);
        }
    }
    // sort distances by value (lowest to highest)
    const sortedDistances = new Map([...distances.entries()].sort((a, b) => a[1] - b[1]));
    return sortedDistances;
}

function connectJunctionBoxes(idBoxA: number, idBoxB: number, iCircuits: number) {
    let circuitToMove: number[] = [];
    let iToDelete = 0;
    for (let i = 0; i < circuits.length; i++) {
        const circuit = circuits[i];
        if (circuit.includes(Number(idBoxB))) {
            circuitToMove = circuits[i];
            iToDelete = i;
        }
    }
    circuits[iCircuits].push(...circuitToMove);
    circuits.splice(iToDelete, 1);
}

const allDistances = getAllDistances(junctionBoxes);
const firstDistances = new Map([...allDistances].slice(0, 1000));
const circuits = junctionBoxes.map((box) => [box.id]);

firstDistances.forEach((_distance, key) => {
    const [idBoxA, idBoxB] = key.split('-');
    for (let i = 0; i < circuits.length; i++) {
        const circuit = circuits[i];
        if (circuit.includes(Number(idBoxA)) && circuit.includes(Number(idBoxB))) {
            return; // already connected
        }
        if (circuit.includes(Number(idBoxA))) {
            connectJunctionBoxes(Number(idBoxA), Number(idBoxB), i);
        } else if (circuit.includes(Number(idBoxB))) {
            connectJunctionBoxes(Number(idBoxB), Number(idBoxA), i);
        }
    }
});

const sortedCircuits = circuits.sort((a, b) => b.length - a.length);

const threeLargestCircuits = sortedCircuits.slice(0, 3);

console.log('3 largest circuits: ', threeLargestCircuits);

const result = threeLargestCircuits.reduce((acc, curr) => {
    return acc *= curr.length;
}, 1);

console.log(result);
