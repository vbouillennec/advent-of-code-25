import fs from 'fs';

const input = fs.readFileSync('./07/input.txt').toString();

const map2D = input.split('\n').map(line => line.split(''));

let nbOfTimelines = 0;

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

function countTimelines() {
	const lastLineIndex = map2D.length - 1
	for(let j = map2D.length - 1; j >= 0; j--) {
		if(map2D[lastLineIndex][j] === '|') {
			backToSource(lastLineIndex, j);
		}
	}
}

function backToSource(lineIndex, colIndex) {
	const li = lineIndex - 1;
	const ci = colIndex;
	if (li === 0 && map2D[li][ci] === 'S') {
		nbOfTimelines++;
		return;
	}
	if(map2D[li][ci] === '|') {
		// console.log(`back to source - li: ${li}, ci: ${ci}`);
		backToSource(li, ci);
	}
	if(map2D[li][ci + 1] === '|') {
		// console.log(`back to source - li: ${li}, ci: ${ci+1}`);
		backToSource(li, ci + 1);
	}
	if(map2D[li][ci - 1] === '|') {
		// console.log(`back to source - li: ${li}, ci: ${ci-1}`);
		backToSource(li, ci - 1);
	}
}

function printMap(map2D: string[][]) {
	for(let i = 0; i < map2D.length; i++) {
		console.log(map2D[i].join(''));
	}
}

console.log(splitCount);

printMap(map2D);

// countTimelines();

// console.log('timelines: ', nbOfTimelines);
