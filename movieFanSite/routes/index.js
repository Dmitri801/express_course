const express = require("express");
const request = require("request");
const router = express.Router();
const apiKey = "c8e5434ff48fefe696f416da26aded69";
const apiBaseUrl = "http://api.themoviedb.org/3";
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = "http://image.tmdb.org/t/p/w300";

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});
/* GET home page. */
router.get("/", function(req, res, next) {
  request.get(nowPlayingUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    res.render("index", { nowPlayingData: parsedData.results });
  });
});

router.get("/movie/:id", (req, res, next) => {
  const movieId = req.params.id;
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  request.get(thisMovieUrl, (error, response, thisMovieData) => {
    const parsedData = JSON.parse(thisMovieData);
    res.render("single-movie", { thisMovie: parsedData });
  });
});

router.post("/search", (req, res, next) => {
  const category = req.body.cat;
  const searchTerm = encodeURI(req.body.movieSearch);
  const searchUrl = `${apiBaseUrl}/search/${category}?api_key=${apiKey}&language=en-US&query=${searchTerm}`;
  request.get(searchUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    let nowPlayingData;
    if (category === "person") {
      nowPlayingData = parsedData.results[0].known_for;
    } else {
      nowPlayingData = parsedData.results;
    }
    res.render("index", { nowPlayingData });
  });
});

module.exports = router;
