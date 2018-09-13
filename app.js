const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


//require the routes
const genres = require('./controller/routes/genres')
const customers = require('./controller/routes/customers')
const movies = require('./controller/routes/movies')
const rentals = require('./controller/routes/rentals')
const users = require('./controller/routes/users')

app.use(express.json());


//Connection to the database
mongoose.connect('mongodb://localhost:27017/vidly', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to the datbase...')
    })
    .catch(err => console.log(err))

//use genre route
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);

app.listen(PORT, () => {
    console.log(`App started at ${PORT}`)
})

