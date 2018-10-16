const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080;

// MIDDLEWARE
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>This Is The Home GET Page</h1>");
});

app.post("/", (req, res) => {
  res.json({ post: req.body.post });
});

app.listen(PORT, () => {
  console.log(`Up On Port ${PORT}`);
});
