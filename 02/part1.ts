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
    // If the numbers in range are all odds, all of the numbers in this range are valid
    if (startRange.length === endRange.length && startRange.length % 2 !== 0)
        return [];

    for (let num = Number(startRange); num <= Number(endRange); num++) {
        const numToStr = num.toString();
        const halfPos = numToStr.length / 2;
        const firstHalf = numToStr.substring(0, halfPos);
        const secondHalf = numToStr.substring(halfPos);
        if (firstHalf === secondHalf) {
            invalidIDs.push(num);
        }
    }
    return invalidIDs;
}

console.log(findInvalidIDs(ranges).reduce((prev, curr) => {
    return prev + curr;
}));
