import fs from "fs";

const input = fs.readFileSync("./04/input2.txt").toString();

const map2D = input.split("\n").map((line) => line.split(''));

const directionsToCheck = [
	{ x: -1, y: -1 },
	{ x: -1, y: 0 },
	{ x: -1, y: 1 },
	{ x: 0, y: -1 },
	{ x: 0, y: 1 },
	{ x: 1, y: -1 },
	{ x: 1, y: 0 },
	{ x: 1, y: 1 },
];

function checkAllRolls(map: string[][]) {
	let accessibleRollsOfPaper = 0;
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			if (map[i][j] === '@' && checkRollAt(i, j)) {
				accessibleRollsOfPaper++;
			}
		}
	}
	return accessibleRollsOfPaper;
}

function checkRollAt(x: number, y: number) {
	let rollAround = 0;
	for (const direction of directionsToCheck) {
		const xCheck = x + direction.x;
		const yCheck = y + direction.y;
		if (validPosition(xCheck, yCheck)) {
			if (map2D[xCheck][yCheck] === '@') {
				rollAround++;
			}
		}
	}
	return rollAround < 4;
}

function validPosition(x, y) {
	return (
		(x >= 0 && x < map2D.length) &&
		(y >= 0 && y < map2D[x].length)
	)
}

const nbOfAccessibleRollsOfPaper = checkAllRolls(map2D);

console.log(nbOfAccessibleRollsOfPaper);
