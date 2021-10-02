const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  res.sendStatus(500)
});

router.get('/:id', (req, res) => {
  const movieId = req.params.id;
  const query = `SELECT "genres"."name" from "genres"
  JOIN "movies_genres" ON "movies_genres"."genre_id"="genres"."id"
  JOIN "movies" ON "movies_genres"."movie_id" = "movies"."id" WHERE "movies"."id"=$1;` 
  pool.query(query, [movieId])
    .then(result => {
      res.send(result.rows)
    })
    .catch(err => {
      console.log('Error getting movie', err);
      res.sendStatus(500);
    })
});

module.exports = router;