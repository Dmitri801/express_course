const express = require("express");
const router = express.Router();
const movies = require("../data/movies");
router.get("/", (req, res, next) => {
  res.render("index", { title: "The Fake MOVIE API" });
});

router.get("/mostPopular", (req, res, next) => {
  // Get The Page Variable From The Default String
  let page = req.query.page;
  if (page === undefined) {
    page = 1;
  }

  let result = movies.filter(movie => movie.most_popular);
  result = result.splice((page - 1) * 20, (page - 1) * 20 + 19);
  res.json(result);
});

module.exports = router;
