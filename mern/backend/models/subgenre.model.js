const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subgenre = new Schema({
    genre: {
        type: String
    },
    subgenre: {
        type: String
    }
});

module.exports = mongoose.model('p_subgenres', Subgenre);