const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema({
    title: {
        type: String
    },
    url: {
        type: String
    },
    description: {
        type: String
    },
    author: {
        type: String
    },
    cover: {
        type: String
    },
    side: {
        type: String
    },
    back: {
        type: String
    },
    subgenre: {
        type: String
    },
    price: {
        type: Object
    },
    reviews: {
        type: Object
    },
    details: {
        type: Object
    }
});

module.exports = mongoose.model('p_books', Book);