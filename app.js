const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Please enter your name:", (name) => {
  console.log("you entered: " + name);
  rl.close();
});

rl.on("close", () => {
  console.log("closex");
  process.exit;
});
