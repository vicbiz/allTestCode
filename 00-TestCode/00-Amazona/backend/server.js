//
// Node can understand only ES5 not ES6... so import express from "express" will be error when "node backend/server.js"
// So need to install Babel....
// npm i @babel/cli @babel/core @babel/node @babel/preset-env nodemon
//
import express from "express";
import data from "./data";

const app = express();

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(5000, () => {
  console.log("Express Server Started at http://localhost:5000");
});
