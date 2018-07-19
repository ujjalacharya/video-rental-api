const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isGold: Boolean,
    phone: Number
})

module.exports = User = mongoose.model('User', UserSchema)