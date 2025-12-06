import fs from "fs";

const input = fs.readFileSync("./06/input.txt").toString();

const map2D = input.split("\r\n").map((row) => row.split(''));
