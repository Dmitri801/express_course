const express = require("express");
const PORT = 8080;
const app = express();

// Middleware function is any function that has access to the req, res, and next objects
function validateUser(req, res, next) {
  // Get info out of the req object
  // Validate with the DB
  // IF validated run code below
  res.locals.validated = true;
  console.log("VALIDATED");
  next();
}

app.use("/admin", validateUser);

app.get("/", (req, res, next) => {
  res.send("<h1>Main Page</h1>");
  console.log(res.locals.validated);
});

app.get("/admin", (req, res, next) => {
  res.send("<h1>Admin Page</h1>");
  console.log(res.locals.validated);
});

app.get("/alsoadmin", validateUser, (req, res) => {
  res.send("Ayy");
  console.log(res.locals.validated);
});

app.listen(PORT, () => {
  console.log(`Up On Port ${PORT}`);
});
