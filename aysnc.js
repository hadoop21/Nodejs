const fs = require("fs");

const textIn = fs.readFile(
  "/Users/uday/Projects/Nodejs/Files/start.txt",
  "utf-8",
  (error1, data1) => {
    if (error1) {
      console.log(error1);
      return;
    }

    console.log(data1.trim()); // Trim leading/trailing whitespace

    fs.readFile(
      `/Users/uday/Projects/Nodejs/Files/${data1.trim()}.txt`,
      "utf-8",
      (error2, data2) => {
        if (error2) {
          console.log(data2);
          return;
        }

        console.log(data2);
        fs.readFile(
          "/Users/uday/Projects/Nodejs/Files/append.txt",
          "utf-8",
          (error3, data3) => {
            console.log(data3);
            fs.writeFile(
              `/Users/uday/Projects/Nodejs/Files/written.txt`,
              `${data2} \n\n ${data3} \n\n Date Created ${new Date()}`,
              () => {
                console.log("File written successfully");
              }
            );
          }
        );
      }
    );
  }
);

console.log("Reading file...");
