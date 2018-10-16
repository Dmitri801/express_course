const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    msg: "We're Routing!!"
  });
});

module.exports = router;
