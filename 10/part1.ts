import fs from 'fs';

const lines = fs.readFileSync('./10/input2.txt').toString().split('\n');

const regex = /\[(\S+)\]\s(.*)\s\{(\S+)\}/;
const machines: Machine[] = lines.map((line) => {
	const matches = line.match(regex);
	return {
		lightDiagram: matches[1].split(''),
		buttons: matches[2],
		joltageRequirements: matches[3].split(',').map(Number),
	};
});

const totalNumberOfPresses = matchAllIndicatorLights(machines);

console.log(totalNumberOfPresses);

/* Functions */

interface Machine {
	lightDiagram: string[],
	buttons: string,
	joltageRequirements: number[],
}

interface Combination {
	buttonsPressed: number[],
	result: number,
}

function getBinaryOfLights(lightDiagram: string[]): string {
	return lightDiagram.reduce((acc, light) => {
		return (light === '#') ? acc + '1' : acc + '0';
	}, '');
}

function getBinaryOfButtons(buttons: string, binLength: number): number[] {
	const binButtons = [];
	const regex: RegExp = /\(([^)]+)\)/g;
	const buttonsSwitches: string[] = [...buttons.matchAll(regex)].map((match) => match[1]);
	for (const button of buttonsSwitches) {
		const switches = button.split(',');
		let binButton = 0;
		for (const aSwitch of switches) {
			const rightPos = (binLength - 1) - Number(aSwitch);
			const bin = 0 ^ 1 << rightPos;
			binButton = binButton ^ bin;
		}
		binButtons.push(binButton);
	}
	return binButtons;
}

function tryCombinations(binButtons: number[], buttonCombinations: Combination[], expectedResult: number) {
	const newButtonCombinations: Combination[] = [];
	for (const combination of buttonCombinations) {
		for (let j = 0; j < binButtons.length; j++) {
			const combined = combination.result ^ binButtons[j];
			const newButtonsPressed = [...combination.buttonsPressed, j];
			newButtonCombinations.push({ buttonsPressed: newButtonsPressed, result: combined });
			if (combined === expectedResult) {
				return newButtonsPressed.length;
			}
		}
	}
	return tryCombinations(binButtons, newButtonCombinations, expectedResult);
}

function matchIndicatorLights(machine: Machine): number {
	const { lightDiagram, buttons } = machine;
	const nbOfLight = lightDiagram.length;
	const binLights: number = parseInt(getBinaryOfLights(lightDiagram), 2);
	const binButtons = getBinaryOfButtons(buttons, nbOfLight);
	const buttonCombinations: Combination[] = binButtons.map((button, i) => {
		return { buttonsPressed: [i], result: button }
	})
	const iMatchBtn = binButtons.indexOf(binLights);
	// if a button solo directly match the diagram
	if (iMatchBtn !== -1) {
		return 1;
	}
	// Try combining buttons
	return tryCombinations(binButtons, buttonCombinations, binLights);
}

function matchAllIndicatorLights(machines: Machine[]): number {
	let nbOfPresses = 0;
	for (const machine of machines) {
		nbOfPresses += matchIndicatorLights(machine);
	}
	return nbOfPresses;
}