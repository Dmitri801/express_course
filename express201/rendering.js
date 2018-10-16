const express = require("express");
const path = require("path");
const helmet = require("helmet");
const app = express();

app.use(helmet());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

function validateUser(req, res, next) {
  // ... validate logic
  res.locals.validated = true;
  next();
}

app.use(validateUser);

app.get("/", (req, res, next) => {
  res.render("index", {
    country: {
      name: "Russia",
      capital: "Moscow"
    },
    msg: "success"
  });
});

app.listen(8080, () => {
  console.log("Server Up");
});
