var express = require('express')
var router = express.Router()
const Genre = require('../models/genre.model');
//All Genres
router.route('/').get((req, res) => {
  Genre.find((err, genres) => {
      if (err) console.log(err);
      else {
          res.json(genres);
      }
  });
});

module.exports = router