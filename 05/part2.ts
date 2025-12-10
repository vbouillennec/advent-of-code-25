import fs from "fs";

const [ingredientIDsRangesPart, availableIngredientsPart] = fs.readFileSync("./05/input2.txt").toString().split("\n\n");

const ingredientIDsRanges = ingredientIDsRangesPart.split("\n").map((line) => {
    const [start, end] = line.split("-");
    return { start: Number(start), end: Number(end) };
});

const freshIngredients = new Set<number>();

function getFreshIngredientsInRanges() {
    for (const ingredientIDsRange of ingredientIDsRanges) {
        const rangeStart = ingredientIDsRange.start;
        const rangeEnd = ingredientIDsRange.end;
        for (let i = rangeStart; i <= rangeEnd; i++) {
            freshIngredients.add(i);
        }
    }
}

getFreshIngredientsInRanges();

const nbOfFreshIngredients = freshIngredients.size;

console.log(nbOfFreshIngredients);
