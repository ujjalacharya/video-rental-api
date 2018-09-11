const mongoose = require('mongoose');
const {GenreSchema} = require('./Genre')
const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: GenreSchema,
        required: true
    },
    numberInStock: Number,
    dailyRentalRate: Number
})

module.exports = Movie = mongoose.model('Movie', MovieSchema);