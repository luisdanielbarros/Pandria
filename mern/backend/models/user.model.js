const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    loggedIn: {
        type: Boolean
    },
    id: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    gender: {
        type: String
    },
    birth: {
        type: Date
    },
    cookie: {
        type: String
    },
    cookieExpiration: {
        type: Date
    }
});

User.virtual('firstName').set(function() {
    let nameSplit = name.split(' ');
    this.firstName = nameSplit[0];
    this.lastName = nameSpit[1];
});

module.exports = mongoose.model('users', User);