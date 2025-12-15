import fs from 'fs';

const input = fs.readFileSync('./07/input.txt').toString();

const map2D = input.split('\n').map(line => line.split(''));

console.log(map2D);

function drawTachyonBeam() {
    const startPos = map2D[0].indexOf('S');
    const tachyonBeams = new Set([startPos]);
    for (let i = 1; i < map2D.length; i++) {
        for (const tachyonBeam of tachyonBeams) {
            if (map2D[i][tachyonBeam] === '.') {
                tachyonBeams.add(tachyonBeam);
                map2D[i][tachyonBeam] = '|';
            } else if (map2D[i][tachyonBeam] === '^') {
                tachyonBeams.delete(tachyonBeam);
                tachyonBeams.add(tachyonBeam - 1);
                tachyonBeams.add(tachyonBeam + 1);
                map2D[i + 1][tachyonBeam - 1] = '|';
                map2D[i + 1][tachyonBeam + 1] = '|';
            }
        }
    }

    // Placeholder for tachyon beam drawing logic
}

drawTachyonBeam();