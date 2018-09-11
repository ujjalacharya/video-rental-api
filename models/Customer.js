const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isGold: Boolean,
    phone: Number
})

exports.CustomerSchema = CustomerSchema;
exports.Customer = mongoose.model('Customer', CustomerSchema);