const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Genre = new Schema({
    genre: {
        type: String
    }
});

module.exports = mongoose.model('p_genres', Genre);