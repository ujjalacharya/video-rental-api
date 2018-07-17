const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

module.exports = Genre = mongoose.model('Genre', GenreSchema);