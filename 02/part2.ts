import fs from "fs";

const input = fs.readFileSync("./02/input2.txt").toString();

const ranges = input.split(",");

function findInvalidIDs(ranges: string[]) {
    const invalidIDs = [];
    for (const range of ranges) {
        const [startRange, endRange] = range.split('-');
        invalidIDs.push(findInvalidIDsInRange(startRange, endRange));
        invalidIDs.flat();
    }
    return invalidIDs.flat();
}

function findInvalidIDsInRange(startRange: string, endRange: string) {
    const invalidIDs = [];
    for (let num = Number(startRange); num <= Number(endRange); num++) {
        const numToStr = num.toString();
        // On cherche les diviseurs qui divises la taille du nombre
        const divisableNum = getDivisableNumber(numToStr.length);
        // console.log('diviseur de ', num, ': ', divisableNum);
        for (const div of divisableNum) {
            // console.log(`find pattern in ${numToStr} check ${div} ${findPattern(numToStr, div)}`);
            if (findPattern(numToStr, div)) {
                invalidIDs.push(num);
                // console.log('pattern trouvé pour ', num);
                break;
            }
        }
    }
    return invalidIDs;
}

function findPattern(input: string, divisor: number): boolean {
    const parts = splitInParts(input, divisor);
    for (let i = 0; i < parts.length - 1; i++) {
        if (parts[i] !== parts[i + 1]) {
            return false;
        }
    }
    return true;
}

function splitInParts(input: string, divisor: number) {
    const nbParts = input.length / divisor;
    const parts = [];
    let iStart = 0;
    let iEnd = iStart + divisor;
    for (let i = 0; i < nbParts; i++) {
        const part = input.substring(iStart, iEnd);
        parts.push(part);
        iStart = iEnd;
        iEnd = iStart + divisor;
    }
    return parts;
}

function getDivisableNumber(number: number) {
    const divisable = [1];
    const testLimit = Math.floor(Math.sqrt(number));
    for (let i = 2; i <= testLimit; i++) {
        if (number % i === 0) {
            divisable.push(i);
            const divRes = number / i;
            if (!divisable.includes(divRes))
                divisable.push(divRes);
        }
    }
    return divisable;
}

// console.log(findInvalidIDs(ranges));

function sumOfInvalidIDs(ranges) {
    return findInvalidIDs(ranges).reduce((prev, curr) => {
        return prev + curr;
    });
}

console.log(sumOfInvalidIDs(ranges));