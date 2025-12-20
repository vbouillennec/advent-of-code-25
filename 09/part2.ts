import fs from 'fs';

const input = fs.readFileSync('./09/input.txt').toString();

let height = 0;
let width = 0;
let largestArea = 0;

const tiles = input.split('\n').map(line => {
    const [y, x] = line.split(',');
    const numX = Number(x);
    const numY = Number(y);
    height = Math.max(height, numX);
    width = Math.max(width, numY);
    return { x: numX, y: numY };
});

for (const tile of tiles) {
    for (const otherTile of tiles) {
        if (tile === otherTile) continue;
        const areaSize = calcArea(tile, otherTile);
        largestArea = Math.max(largestArea, areaSize);
    }
}

const floor = buildFloor(tiles);

printFloor(floor);

/* Functions */

function calcArea(line: { x: number, y: number }, otherLine: { x: number, y: number }): number {
    const dx = Math.abs(line.x - otherLine.x) + 1;
    const dy = Math.abs(line.y - otherLine.y) + 1;
    const area = dx * dy;
    return area;
}

function buildFloor(tiles: { x: number, y: number }[]) {
    const floor = [];
    for (let i = 0; i <= height + 1; i++) {
        floor.push([]);
        for (let j = 0; j <= width + 1; j++) {
            floor[i][j] = '.'
        }
    }
    return addRedTiles(floor, tiles);
}

function addRedTiles(floor, tiles) {
    const nbOfTiles = tiles.length;
    let prevTile = { x: tiles[nbOfTiles - 1].x, y: tiles[nbOfTiles - 1].y };
    for (let k = 0; k < tiles.length; k++) {
        const x = tiles[k].x;
        const y = tiles[k].y;
        floor[x][y] = '#';
        connectRedTiles(floor, prevTile, tiles[k])
        prevTile = tiles[k];
    }
    return floor
}

function connectRedTiles(floor, firstTile, secondTile) {
    const [ftx, fty, stx, sty] = [firstTile.x, firstTile.y, secondTile.x, secondTile.y]
    // draw horizontally 
    if (ftx === stx && fty !== sty) {
        const start = Math.min(fty, sty);
        const end = Math.max(fty, sty);
        for (let l = start + 1; l < end; l++) {
            floor[ftx][l] = 'X';
        }
    }
    // draw vertically 
    else if (fty === sty && ftx !== stx) {
        const start = Math.min(ftx, stx);
        const end = Math.max(ftx, stx);
        for (let l = start + 1; l < end; l++) {
            floor[l][fty] = 'X';
        }
    }
    return floor;
}

function printFloor(floor: string[][]) {
    for (const row of floor) {
        let line = '';
        for (const tile of row) {
            line += tile;
        }
        console.log(line + '\n');
    }
}

// console.log(floor);
