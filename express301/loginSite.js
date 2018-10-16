const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

// My Middleware
app.use((req, res, next) => {
  if (req.query.msg === "fail") {
    res.locals.msg = "Incorrect Username or Password";
  } else {
    res.locals.msg = "";
  }

  // Go To Next Middleware (EXPRESS IS JUST MIDDLEWARE)
  next();
});

app.param("storyId", (req, res, next, id) => {
  console.log("Params Called", id);
  next();
});

// Routes

app.get("/statement", (req, res, next) => {
  // This will render the statement in the browser
  // res.sendFile(path.join(__dirname + "/public/images/bank_statement.png"));

  // app has a download method! it takes 2 args
  // 1. the file location
  // 2. the name you want to give the file (optional)
  // 3. Optional callback (err) => {}
  res.download(
    path.join(__dirname + "/public/images/bank_statement.png"),
    "statement"
  );
});

app.get("/login", (req, res, next) => {
  console.log(req.params);
  res.render("login");
});

app.get("/welcome", (req, res, next) => {
  res.render("welcome", { email: req.cookies.email });
});

app.get("/logout", (req, res, next) => {
  // res.clearCookie takes 1 arg;
  // 1. cookie to clear by name
  res.clearCookie("email");
  res.redirect("/login");
});

app.post("/process_login", (req, res, next) => {
  // req.body is made by urlencoded, which parses the http sent message for sent data!
  const password = req.body.password;
  const email = req.body.email;
  // Check db to make sure info is valid
  // if valid ..
  // Save username in a cookie
  // Send to home page
  if (password === "x") {
    // res.cookie takes 2 args:
    // 1. name of the cookie
    // 2. value to set it to
    res.cookie("email", email);
    res.redirect("/welcome");
  } else {
    // The "?" is a special character in a URL
    res.redirect("/login?msg=fail");
  }
});

// in a route, anytime something has :  in front it is a wildcard
// wildcard will match any input it gets
app.get("/story/:storyId", (req, res) => {
  // the req.params object always exists
  // it will have a property for each wildcard in the route
  res.send(`<h1>story id: ${req.params.storyId}</h1>`);
});

app.listen(8080, () => {
  console.log("Server Listening");
});
