var express = require('express')
var router = express.Router()
const Book = require('../models/book.model');
//All Books
router.route('/').get((req, res) => {
  //Find
  find = {};
  ////Search String
  search_string = req.query.search_string;
  if (search_string) {
    search_string = { "$regex": search_string, "$options": "i" };
    find = {$or:[{title: search_string}, {description: search_string}, {author: search_string}]};
  }
  ////Subgenre
  subgenre = req.query.subgenre;
  if (subgenre) find.subgenre = subgenre;
  //Url
  url = req.query.url;
  if (url) find.url = url;
  //Sort
  sort = []
  ////Popularity
  popularity = req.query.popularity;
  if (popularity === 'asc') sort.push(['popularity', 1]);
  else if (popularity === 'desc') sort.push(['popularity', -1]);
  ////Release Date
  release_date = req.query.release_date;
  if (release_date === 'asc') sort.push(['details.publication_date', 1]);
  else if (release_date === 'desc') sort.push(['details.publication_date', -1]);
  //Search
  Book.find(find).sort(sort).exec(function(err, books) {
    if (err) console.log(err);
    else {
        res.json(books);
    }
  });
});

module.exports = router