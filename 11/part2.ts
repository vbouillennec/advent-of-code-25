import fs from 'fs';

const lines = fs.readFileSync('./11/input2.txt').toString().split('\n');

const devicesMap = new Map<string, string[]>();

for (const line of lines) {
    const [name, outputs] = line.split(': ')
    devicesMap.set(name, outputs.split(' '))
}

const memoryPaths = new Map<string, number>();

const nbOfPaths = findAllPaths(devicesMap);

console.log(`il y a ${nbOfPaths} chemins`);

/* Functions */

function findAllPaths(devices: Map<string, string[]>): number {
    const validatorDevices = [];
    return findPath('svr', devices, validatorDevices)
}

function findPath(input: string, devices: Map<string, string[]>, validatorDevices: string[]): number {
    if (input === 'out' && isValid(validatorDevices)) {
        return 1;
    } else if (input === 'out') {
        return 0;
    }
    const key = `${input}[${validatorDevices.join(',')}]`
    if (memoryPaths.has(key)) {
        return memoryPaths.get(key);
    }
    const newValidatorDevices = checkValidatorDevices(input, validatorDevices);
    const outputs = devices.get(input);
    let newPaths = 0;
    for (const output of outputs) {
        newPaths += findPath(output, devices, newValidatorDevices);
    }
    if (!memoryPaths.has(key)) {
        memoryPaths.set(key, newPaths);
    }
    return newPaths;
}

function checkValidatorDevices(input: string, validatorDevices: string[]): string[] {
    const newValidatorDevices = [...validatorDevices];
    if (input === 'dac' && !newValidatorDevices.includes('dac')) {
        newValidatorDevices.push(input);
    } else if (input === 'fft' && !newValidatorDevices.includes('fft')) {
        newValidatorDevices.push(input);
    }
    return newValidatorDevices;
}

function isValid(validatorDevices: string[]) {
    return validatorDevices.includes('dac') && validatorDevices.includes('fft')
}