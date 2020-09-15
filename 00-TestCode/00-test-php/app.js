// npm install nodemon --save-dev
// package.json
//   "start": "nodemon app.js"
// npm start

var express = require("express");
var mysql = require("mysql");

// DataBase
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// Express & Router
app = express();

// Static Files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

// Ignore trailing slash
app.use((req, res, next) => {
  const test = /\?[^]*\//.test(req.url);
  if (req.url.substr(-1) === "/" && req.url.length > 1 && !test)
    res.redirect(301, req.url.slice(0, -1));
  else next();
});

// Set Views
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("", (req, res) => {
  res.render("index", { text: "Welcome to homepage" });
});

app.get("/about", (req, res) => {
  res.render("about", { text: "About Page" });
});

app.get("/api/users", (req, res) => {
  var sql = "SELECT * FROM users;";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/api/posts", (req, res) => {
  var sql = "SELECT * FROM posts;";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/api/comments", (req, res) => {
  var sql = "SELECT * FROM comments;";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(3000, "localhost", () => {
  console.log("Server Started Port 3000");
});
