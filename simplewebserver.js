const fs = require("fs");
const http = require("http");
const url = require("url");
const { json } = require("stream/consumers");

const html = fs.readFileSync(
  "/Users/uday/Projects/Nodejs/Template/index.html",
  "utf-8"
);

let products = JSON.parse(
  fs.readFileSync("/Users/uday/Projects/Nodejs/Data/products.json", "utf-8")
);

let productsListHtml = fs.readFileSync(
  "/Users/uday/Projects/Nodejs/Template/products-list.html",
  "utf-8"
);

let productsHtmlArray = products.map((prod) => {
  let output = productsListHtml.replace("{{%IMAGE%}}", prod.productImage);
  output = output.replace("{{%NAME%}}", prod.name);
  output = output.replace("{{%MODELNAME%}}", prod.modeName);
  output = output.replace("{{%MODELNO%}}", prod.modelNumber);
  output = output.replace("{{%SIZE%}}", prod.size);
  output = output.replace("{{%CAMERA%}}", prod.camera);
  output = output.replace("{{%PRICE%}}", prod.price);
  output = output.replace("{{%COLOR%}}", prod.color);
  output = output.replace("{{%ID%}}", prod.id);

  return output;
});

const server = http.createServer((request, response) => {
  let { query, pathname: path } = url.parse(request.url, true);
  // console.log(x);
  // let path = request.url;

  if (path == "/" || path.toLocaleLowerCase() === "/home") {
    response.writeHead(200);
    response.end(html.replace("{{%CONTENT%}}", "You are in Home Page"));
  } else if (path.toLocaleLowerCase() === "/about") {
    response.writeHead(200);
    response.end(html.replace("{{%CONTENT%}}", "You are in About Page"));
  } else if (path.toLocaleLowerCase() === "/contact") {
    response.writeHead(200);
    response.end(html.replace("{{%CONTENT%}}", "You are in Contact Page"));
  } else if (path.toLocaleLowerCase() === "/products") {
    if (!query.id) {
      let productResponceHtml = html.replace(
        "{{%CONTENT%}}",
        productsHtmlArray.join(",")
      );
      response.writeHead(200, { "content-type": "text/html" });
      response.end(productResponceHtml);
    } else {
      response.end("This is a product with ID = " + query.id);
    }
  } else {
    response.writeHead(404);
    response.end(html.replace("{{%CONTENT%}}", "Error:404 Bad Request"));
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server has started");
});
