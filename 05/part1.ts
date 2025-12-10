import fs from "fs";

const [ingredientIDsRangesPart, availableIngredientsPart] = fs.readFileSync("./05/input2.txt").toString().split("\n\n");

const ingredientIDsRanges = ingredientIDsRangesPart.split("\n").map((line) => {
    const [start, end] = line.split("-");
    return { start: Number(start), end: Number(end) };
});
const availableIngredients = availableIngredientsPart.split("\n").map(ingredient => Number(ingredient));

function checkAllIngredientsFreshness(ingredients: number[]): number {
    let freshIngredients = 0;
    for (const ingredient of ingredients) {
        if (checkIngredientFreshness(ingredient))
            freshIngredients++;
    }
    return freshIngredients;
}
function checkIngredientFreshness(ingredient: number) {
    for (const ingredientIDsRange of ingredientIDsRanges) {
        const rangeStart = ingredientIDsRange.start;
        const rangeEnd = ingredientIDsRange.end;
        if (ingredient >= rangeStart && ingredient <= rangeEnd)
            return true;
    }
    return false;
}

const nbOfFreshIngredients = checkAllIngredientsFreshness(availableIngredients);

console.log(nbOfFreshIngredients);
