const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

exports.Genre = mongoose.model('Genre', GenreSchema);
exports.GenreSchema = GenreSchema