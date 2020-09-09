var express = require('express')
var router = express.Router()
const Subgenre = require('../models/subgenre.model');
//All Subgenres
router.route('/').get((req, res) => {
    Subgenre.find((err, subgenres) => {
      if (err) console.log(err);
      else {
          res.json(subgenres);
      }
  });
});
//Search Subgenre by Genre
router.route('/:genre').get((req, res) => {
    Subgenre.find({genre: req.params.genre }, (err, subgenres) => {
        if (err) console.log(err);
        else res.json(subgenres);
    });
  });

module.exports = router