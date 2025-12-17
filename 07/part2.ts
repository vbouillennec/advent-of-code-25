import fs from 'fs';

const input = fs.readFileSync('./07/input2.txt').toString();

const map2D = input.split('\n').map(line => line.split(''));

const startPos = map2D[0].indexOf('S');
const splits = new Map<string, number>();

function countTimelines() {
	const firstLineIndex = 1;
	for (let i = 0; i < map2D[firstLineIndex].length; i++) {
		return tryATimeline(firstLineIndex, startPos);
	}
}

function tryATimeline(lineIndex: number, colIndex: number) {
	const li = lineIndex + 1;
	const ci = colIndex;
	if (li === (map2D.length - 1)) {
		return 1;
	}
	if (map2D[li][ci] === '^') {
		if (splits.has(`[${li},${ci}]`)) {
			return splits.get(`[${li},${ci}]`)!;
		}
		const rightTimeline = tryATimeline(li, ci + 1);
		const leftTimeline = tryATimeline(li, ci - 1);
		splits.set(`[${li},${ci}]`, (leftTimeline + rightTimeline));
		return leftTimeline + rightTimeline;
	}
	const straightTimeline = tryATimeline(li, ci);
	return straightTimeline;
}

const nbOfTimelines = countTimelines();

console.log('timelines: ', nbOfTimelines);