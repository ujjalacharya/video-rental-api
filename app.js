const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');


//require the routes
const genres = require('./controller/routes/genres')
const users = require('./controller/routes/users')
const movies = require('./controller/routes/movies')

app.use(express.json());


//Connection to the database
mongoose.connect('mongodb://localhost:27017/vidly', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to the datbase...')
    })
    .catch(err => console.log(err))

//use genre route
app.use('/api/genres', genres);
app.use('/api/users', users);
app.use('/api/movies', movies);

app.listen(PORT, () => {
    console.log(`App started at ${PORT}`)
})

