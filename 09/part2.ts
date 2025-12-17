import fs from 'fs';

const input = fs.readFileSync('./09/input2.txt').toString();

const lines = input.split('\n').map(line => {
    const [y, x] = line.split(',');
    return { x: Number(x), y: Number(y) };
});

function calcArea(line: { x: number, y: number }, otherLine: { x: number, y: number }): number {
    const dx = Math.abs(line.x - otherLine.x) + 1;
    const dy = Math.abs(line.y - otherLine.y) + 1;
    const area = dx * dy;
    return area;
}

let largestArea = 0;

for (const line of lines) {
    for (const otherLine of lines) {
        if (line === otherLine) continue;
        const areaSize = calcArea(line, otherLine);
        largestArea = Math.max(largestArea, areaSize);
    }
}

console.log('largest area is: ', largestArea);
