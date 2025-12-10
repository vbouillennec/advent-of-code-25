import fs from "fs";

const input = fs.readFileSync("./03/input2.txt").toString();

const lines = input.split("\n");

function getAllLargestJoltage(lines: string[]) {
    const allLargestJoltage = [];
    for (const line of lines) {
        allLargestJoltage.push(getLargestJoltage(line));
    }
    return allLargestJoltage
}

function getLargestJoltage(line: string) {
    // let largetJoltage = 0;
    const batteries = line.split('').map((el) => Number(el));
    const removedBattery = batteries.splice(-1);
    // console.log('removed: ', removedBattery)
    const highestRating = Math.max(...batteries);
    const highestRatingPos = batteries.indexOf(highestRating);
    batteries.push(removedBattery[0]);
    const leftBatteries = batteries.slice(highestRatingPos + 1);
    const secondHighestRating = Math.max(...leftBatteries)
    // const secondHighestRatingPos = batteries.indexOf(highestRating);
    // console.log(highestRating, secondHighestRating);
    // for (let i = 0; i < batteries.length - 1; i++) {
    //     Math.max()
    // }
    return highestRating * 10 + secondHighestRating;
}

const allLargestJoltage = getAllLargestJoltage(lines);

const sumOfLargestJoltage = allLargestJoltage.reduce((acc, curr) => acc + curr, 0)

console.log(sumOfLargestJoltage);