import fs from "fs";

const input = fs.readFileSync("./01/input2.txt").toString();

const lines = input.split("\n");

const initialPosition = 50;

let direction = '';
let actualPosition = initialPosition;
let rotationNumber = 0;


const executeInstruction = (lines: string[]) => {
    let zeroCount = 0;
    for(const line of lines) {
        direction = line.charAt(0);
        rotationNumber = Number(line.slice(1));
        if(direction === 'L') {
            const res = actualPosition - rotationNumber;
            if(res < 0) {
                actualPosition = (100 - Math.abs(res) % 100) % 100;
            } else {
                actualPosition = res;
            }
        } else {
            const res = actualPosition + rotationNumber;
            actualPosition = res % 100;
        }
        console.log('the dial rotated ' + line);
        
        console.log('actual position ' + actualPosition);
        if (actualPosition === 0) {
            zeroCount++;
        }
    }
    return zeroCount;
}

console.log(executeInstruction(lines));

