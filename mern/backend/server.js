//Node.js Framework, facilitates building a node.js server
const express = require('express');
//Instatiate the Server
const app = express();
//Enables Cross-Origin Resource Sharing for the ajax calls to the database
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 4000;
//Library for facilitating connection with mongodb database
const mongoose = require('mongoose');

//Mongoose connection
////Connection to the mongodb database
mongoose.connect('mongodb+srv://Luisd:V4CTjlbOb7bXTv4R@cluster0-3b3bl.gcp.mongodb.net/mern?retryWrites=true&w=majority',
 { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000, authSource: 'admin', family: 4 }, (error) => { if (error) console.log('Connection error #1: '+error) } );
const connection = mongoose.connection;
////Connection listeners
connection.once('open', () => {
    console.log('Connection established sucessfully');
});
connection.on('error', error => {
    console.log('Connection error #2: '+error);
});

//App usages
app.use(cors());
app.use(bodyParser.json());

//Routers
const usersRouter = require('./routers/routerUsers');
const genresRouter = require('./routers/routerGenres');
const subGenresRouter = require('./routers/routerSubgenres');
const booksRouter = require('./routers/routerBooks');
app.use('/users', usersRouter);
app.use('/genres', genresRouter);
app.use('/subgenres', subGenresRouter);
app.use('/books', booksRouter);

//Adding App Listener to the Port that the Server is running on
app.listen(PORT, () => {
    console.log('Server is running on port: '+PORT);
});