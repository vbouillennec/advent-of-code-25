import fs from 'fs';

const lines = fs.readFileSync('./11/input2.txt').toString().split('\n');

const devicesMap = new Map<string, string[]>();

for (const line of lines) {
    const [name, outputs] = line.split(': ')
    devicesMap.set(name, outputs.split(' '))
}

const nbOfPaths = findAllPaths(devicesMap);

console.log(`il y a ${nbOfPaths} chemins`);

/* Functions */

function findAllPaths(devices: Map<string, string[]>): number {
    return findPath('you', devices)
}

function findPath(input: string, devices: Map<string, string[]>, paths = 0): number {
    if (input === 'out') {
        return ++paths;
    }
    const outputs = devices.get(input);
    for (const output of outputs) {
        paths = findPath(output, devices, paths);
    }
    return paths;
}