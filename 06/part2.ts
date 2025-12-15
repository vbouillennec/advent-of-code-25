import fs from "fs";

const input = fs.readFileSync("./06/input2.txt").toString();

const operations2D = input.split("\n").map((line) => line.split(''));

const symbolLine = operations2D.pop() as string[];

function makeCalculation(symbolLine: string[]) {
	let total = 0;
	let problemStartIndex = 0;
	let problemSymbol = symbolLine[problemStartIndex];
	let problemEndIndex = 0;
	for (let i = 0; i < symbolLine.length; i++) {
		if ((symbolLine[i] === '*' || symbolLine[i] === '+' || i === symbolLine.length - 1) && problemStartIndex !== i) {
			if (i === symbolLine.length - 1) {
				problemEndIndex = i;
			} else {
				problemEndIndex = i - 2;
			}
			if (problemSymbol === '+') {
				total += sumResolve(problemStartIndex, problemEndIndex);
			} else if (problemSymbol === '*') {
				total += productResolve(problemStartIndex, problemEndIndex);
			}
			if (i !== symbolLine.length - 1) {
				problemSymbol = symbolLine[i];
				problemStartIndex = i;
			}
		}
	}
	return total;
}

function sumResolve(start: number, end: number) {
	let result = 0;
	let strNumber = '';
	let colIndex = end;
	while (colIndex >= start) {
		for (let lineIndex = 0; lineIndex < operations2D.length; lineIndex++) {
			strNumber = strNumber + operations2D[lineIndex][colIndex];
		}
		colIndex--;
		result += Number(strNumber);
		strNumber = '';
	}
	return result;
}

function productResolve(start: number, end: number) {
	let result = 1;
	let strNumber = '';
	let colIndex = end;
	while (colIndex >= start) {
		for (let lineIndex = 0; lineIndex < operations2D.length; lineIndex++) {
			strNumber = strNumber + operations2D[lineIndex][colIndex];
		}
		colIndex--;
		result *= Number(strNumber);
		strNumber = '';
	}
	return result;
}

console.log(makeCalculation(symbolLine));