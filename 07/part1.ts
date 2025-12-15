import fs from 'fs';

const input = fs.readFileSync('./07/input2.txt').toString();

const map2D = input.split('\n').map(line => line.split(''));

function drawTachyonBeam() {
    const startPos = map2D[0].indexOf('S');
    const tachyonBeams = new Set([startPos]);
    let splitCount = 0;
    for (let i = 1; i < map2D.length; i++) {
        for (const tachyonBeam of tachyonBeams) {
            if (map2D[i][tachyonBeam] === '.') {
                tachyonBeams.add(tachyonBeam);
                map2D[i][tachyonBeam] = '|';
            } else if (map2D[i][tachyonBeam] === '^') {
                splitCount++;
                tachyonBeams.delete(tachyonBeam);
                tachyonBeams.add(tachyonBeam - 1);
                tachyonBeams.add(tachyonBeam + 1);
                map2D[i + 1][tachyonBeam - 1] = '|';
                map2D[i + 1][tachyonBeam + 1] = '|';
            }
        }
    }
    return splitCount;
}

const splitCount = drawTachyonBeam();

console.log(splitCount);