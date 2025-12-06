import fs from "fs";

const input = fs.readFileSync("./12/input.txt").toString();

const map2D = input.split("\r\n").map((line) => line.split(""));
