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

function validateMovie(movie) {
    const schema = {
        title: Joi.string().required().min(3),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number(),
        genreId: Joi.objectId().required()
    }
    return Joi.validate(movie, schema)
}

exports.validateMovie = validateMovie

exports.Movie = mongoose.model('Movie', MovieSchema);