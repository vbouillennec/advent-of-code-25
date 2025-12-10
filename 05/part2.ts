import fs from "fs";

const [ingredientIDsRangesPart, availableIngredientsPart] = fs.readFileSync("./05/input2.txt").toString().split("\n\n");

const ingredientIDsRanges = ingredientIDsRangesPart.split("\n").map((line) => {
    const [start, end] = line.split("-");
    return { start: Number(start), end: Number(end) };
});

const sortedRanges = ingredientIDsRanges.sort((a, b) => {
  if (a.start !== b.start) {
    return a.start - b.start;
  }
  return a.end - b.end;
});

console.log('sortedRanges', sortedRanges);


function simplifyRanges() {
    let prevRange = {start: 0, end: 0};
    const simplifiedRanges = [];
    for (const idsRange of sortedRanges) {
        const rangeStart = idsRange.start;
        const rangeEnd = idsRange.end;
        // console.log(`${prevRange} VS ${idsRange}`);
        if(rangeStart >= prevRange.start && rangeEnd <= prevRange.end) {
            continue;
        }
        if(rangeStart >= prevRange.start && rangeStart <= prevRange.end && rangeEnd >= prevRange.end){
            const simplifiedRange = {start: prevRange.start, end: rangeEnd};
            prevRange = simplifiedRange;
            simplifiedRanges.pop();
            simplifiedRanges.push(simplifiedRange);
        } else {
            prevRange = idsRange;
            simplifiedRanges.push(idsRange);
        }
        // console.log(prevRange);
    }
    return simplifiedRanges;
}

function countIdsInRanges(ranges) {
    let nbIds = 0;
    for(const range of ranges) {
        nbIds += (range.end - range.start) + 1;
        // console.log(range);
        // console.log(nbIds);
    }
    return nbIds;
}

const simplifiedRanges = simplifyRanges();

// console.log('simplifiedRanges', simplifiedRanges);


console.log(countIdsInRanges(simplifiedRanges));


