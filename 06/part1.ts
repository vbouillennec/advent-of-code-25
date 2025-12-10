import fs from "fs";

const input = fs.readFileSync("./06/input2.txt").toString();

const problemsParts = input.split("\n").map((row) => row.match(/\S+/g));

const problemsOperations = problemsParts.pop();

function makeCalculation(problemsParts: RegExpMatchArray[], problemsOperations: string[]) {
	let total = 0;
	for(let i = 0; i < problemsOperations.length; i++) {
		const problemSymbol = problemsOperations[i];
		let result = problemSymbol === '*' ? 1 : 0;
		for(let j = 0; j < problemsParts.length; j++) {
			if(problemSymbol === '*') {
				result *= Number(problemsParts[j][i]);
			} 
			else if(problemSymbol === '+') {
				result += Number(problemsParts[j][i]);
			}
		}
		total += result; 
	}
	return total;
}

console.log(makeCalculation(problemsParts, problemsOperations));