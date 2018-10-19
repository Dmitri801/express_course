const express = require("express");
const router = express.Router();
const movies = require("../data/movies");
const people = require("../data/people");
function checkForQuery(req, res, next) {
  if (!req.query.query) {
    res.json({
      error: "Query Is Required"
    });
  } else {
    next();
  }
}

router.use(checkForQuery);

router.get("/", (req, res, next) => {
  res.json({
    message: "Up n Runnin'"
  });
});

router.get("/movie", (req, res, next) => {
  const searchTerm = req.query.query;
  const results = movies.filter(movie => {
    let found =
      movie.overview.includes(searchTerm) || movie.title.includes(searchTerm);
    return found;
  });
  if (!results) {
    res.json({ msg: "Can't Find Any Matches" });
  } else {
    res.json(results);
  }
});

router.get("/person", (req, res, next) => {
  const searchTerm = req.query.query;
  const results = people.filter(person => {
    let found = person.name.includes(searchTerm);
    return found;
  });
  if (!results || results.length <= 0) {
    res.json({ msg: "Can't Find Any Matches, Check Your Spelling" });
  } else {
    res.json(results);
  }
});

module.exports = router;
