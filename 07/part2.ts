import fs from 'fs';

const input = fs.readFileSync('./07/input.txt').toString();

const map2D = input.split('\n').map(line => line.split(''));

let nbOfTimelines = 0;
const startPos = map2D[0].indexOf('S');
const tachyonBeams = new Set([startPos]);
const paths = new Map<string, number[]>();

function drawTachyonBeam() {
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
	const lastLineIndex = 1;
	for (let i = 0; i < map2D[lastLineIndex].length; i++) {
		if (map2D[lastLineIndex][i] === '|') {
			const potentialPath = new Map();
			tryATimeline(lastLineIndex, i, potentialPath);
		}
	}
}

function tryATimeline(lineIndex: number, colIndex: number, potentialPath: Map<string, number[]>) {
	const li = lineIndex + 1;
	const ci = colIndex;
	potentialPath.set(`[${li},${ci}]`, [li,ci]);
	if (li === (map2D.length - 1) && map2D[li][ci] === '|') {
		nbOfTimelines++;
		return;
	}
	if (map2D[li][ci] === '|') {
		tryATimeline(li, ci);
	}
	if (map2D[li][ci] === '^' && map2D[li][ci + 1] === '|') {
		tryATimeline(li, ci + 1);
	}
	if (map2D[li][ci] === '^' && map2D[li][ci - 1] === '|') {
		tryATimeline(li, ci - 1);
	}
}

function printMap(map2D: string[][]) {
	for(let i = 0; i < map2D.length; i++) {
		console.log(map2D[i].join(''));
	}
}

console.log(splitCount);

printMap(map2D);

countTimelines();

console.log('timelines: ', nbOfTimelines);