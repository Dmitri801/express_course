const express = require("express");
const router = express.Router();

// This is middleware that will only be added to the user routes
function validateUser(req, res, next) {
  res.locals.validated = true;
  console.log("Validated");
  next();
}

router.use(validateUser);

router.get("/", (req, res, next) => {
  res.json({
    msg: "User Router Works!!"
  });
});

module.exports = router;
