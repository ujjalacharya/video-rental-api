const mongoose = require('mongoose');
const Joi = require('joi')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  password:{
    type: String,
    required: true
  }
})

function validateUser(user){
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
  return Joi.validate(user, schema);
}

exports.validateUser = validateUser;

exports.User = mongoose.model('User', UserSchema);