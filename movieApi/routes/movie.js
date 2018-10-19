const express = require("express");
const router = express.Router();
const movieDetails = require("../data/movieDetails");

function requireJSON(req, res, next) {
  if (!req.is("application/json")) {
    res.json({ error: "Must be content type application/json" });
  } else {
    next();
  }
}

router.param("movieId", (req, res, next) => {
  console.log("Someone Hit the Movie ID WildCard Route");
  next();
});

router.get("/topRated", (req, res, next) => {
  // Sort in descending order in pages of 20 based on voting average
  let page = req.query.page;
  if (!page) {
    page = 1;
  }
  const topRated = movieDetails.sort((a, b) => b.vote_average - a.vote_average);
  let result = topRated.splice((page - 1) * 20, (page - 1) * 20 + 19);
  res.json(result);
});

router.get("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;
  const movieDetail = movieDetails.find(movie => movie.id == movieId);
  if (!movieDetail) res.status(404).json({ error: "That Movie Doesn't Exist" });
  res.json(movieDetail);
});

router.post("/:movieId/rating", requireJSON, (req, res, next) => {
  const movieId = req.params.movieId;

  res.json({
    msg: "Rating Submitted"
  });
});

router.delete("/:movieId/rating", requireJSON, (req, res, next) => {
  res.json({
    msg: "Rating Deleted"
  });
});

module.exports = router;
