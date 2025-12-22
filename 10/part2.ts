import fs from 'fs';

const lines = fs.readFileSync('./10/input.txt').toString().split('\n');

const regex = /\[(\S+)\]\s(.*)\s\{(\S+)\}/;
const machines: Machine[] = lines.map((line) => {
    const matches = line.match(regex);
    return {
        buttons: matches[2],
        joltageRequirements: matches[3].split(',').map(Number),
    };
});

const totalNumberOfPresses = matchAllIndicatorLights(machines);

console.log(totalNumberOfPresses);

/* Functions */

interface Machine {
    buttons: string,
    joltageRequirements: number[],
}

interface Combination {
    buttonsPressed: number[],
    joltage: number[],
}

function tryCombinations(buttonsSwitches: number[][], combinations: Combination[], expectedResult: number[]) {
    const newButtonCombinations: Combination[] = [];
    for (const combination of combinations) {
        for (let j = 0; j < buttonsSwitches.length; j++) {
            console.log(`combination:`, combination);
            const newCombination = pressButton(buttonsSwitches[j], combination);
            newCombination.buttonsPressed.push(j);
            newButtonCombinations.push(newCombination);
            if (JSON.stringify(newCombination.joltage) === JSON.stringify(expectedResult)) {
                return newCombination.buttonsPressed.length;
            }
        }
    }
    return tryCombinations(buttonsSwitches, newButtonCombinations, expectedResult);
}

function pressButton(button: number[], combination: Combination): Combination {
    const newCombination = { ...combination };
    for (const pos of button) {
        newCombination.joltage[pos]++;
    }

    return newCombination;
}

function matchIndicatorLights(machine: Machine): number {
    const { buttons, joltageRequirements } = machine;
    const nbOfJoltage = joltageRequirements.length;
    const initJoltage: number[] = Array(nbOfJoltage).fill(0);
    const regex: RegExp = /\(([^)]+)\)/g;
    const buttonsSwitches: number[][] = [...buttons.matchAll(regex)].map((match) => match[1].split(',').map(Number));
    const initCombination: Combination[] = [{ buttonsPressed: [], joltage: initJoltage }];
    // // Try combining buttons
    return tryCombinations(buttonsSwitches, initCombination, joltageRequirements);
}

function matchAllIndicatorLights(machines: Machine[]): number {
    let nbOfPresses = 0;
    for (const machine of machines) {
        nbOfPresses += matchIndicatorLights(machine);
    }
    return nbOfPresses;
}