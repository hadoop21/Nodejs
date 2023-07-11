const fs = require("fs");
const { text } = require("stream/consumers");

const textIn = fs.readFileSync(
  "/Users/uday/Projects/Nodejs/input.txt",
  "utf-8"
);
console.log(textIn);

let content = `Data read from input.txt: ${textIn}. \n Date created ${new Date()}`;
fs.writeFileSync("/Users/uday/Projects/Nodejs/output.txt", content);
