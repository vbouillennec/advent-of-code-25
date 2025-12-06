import fs from "fs";

const input = fs.readFileSync("./01/input2.txt").toString();

const lines = input.split("\n");

const initialPosition = 50;

let direction = '';
let actualPosition = initialPosition;
let prevPos = actualPosition;
let rotationNumber = 0;

const executeInstruction = (lines: string[]) => {
	let zeroCount = 0;
	for(const line of lines) {
		direction = line.charAt(0);
		rotationNumber = Number(line.slice(1));
		prevPos = actualPosition;
		if(direction === 'L') {
			const res = actualPosition - rotationNumber;
			if(res <= 0) {
				if(prevPos !== 0)
					zeroCount++;
				zeroCount += Math.floor(Math.abs(res) / 100);
				actualPosition = (100 - Math.abs(res) % 100) % 100;
			} else {
				actualPosition = res;
			}
		} else {
			const res = actualPosition + rotationNumber;           
			if(res >= 100)
				zeroCount += Math.floor(res / 100);
			actualPosition = res % 100;
		}
	}
	return zeroCount;
}

console.log(executeInstruction(lines));