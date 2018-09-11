const mongoose = require("mongoose");
const { CustomerSchema } = require("./Customer");
const Joi = require("joi");

const RentalSchema = new mongoose.Schema({
  customer: {
    type: CustomerSchema,
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 200
      }
    }),
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
});

function validateRental(rental) {
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  };
  return Joi.validate(rental, schema);
}

exports.Rental = mongoose.model("Rental", RentalSchema);
