const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080;

app.use(express.static("public"));

app.all("/", (req, res) => {
  console.log(path.join(__dirname + "/node.html"));
  res.sendFile(path.join(__dirname + "/node.html"));
});

app.all("*", (req, res) => {
  res.send("<h1>This Page Doesn't Exist...</h1>");
});

app.listen(PORT, () => {
  console.log(`Up On Port: ${PORT}`);
});
