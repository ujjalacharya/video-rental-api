const router = require("express").Router();
const { Rental, validateRental } = require("../../models/Rental");
const { Customer } = require("../../models/Customer");
const {Movie} = require("../../models/Movie");
const mongoose = require("mongoose");
const Fawn = require("fawn");

//Initialize Fawn
Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rentals = await Rental.find({}).sort("-dateOut");
  res.json(rentals);
});

router.post("/", async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid Movie");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie out of stock");

  const newRental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  try{
    Fawn.Task()
      .save('rentals', newRental)
      .update('movies', {_id: movie._id}, {$inc: {numberInStock: -1}})
      .run()
      res.json(newRental)
  }
  catch(e){
    res.status(500).json("Some error occured")
  }
})

module.exports = router;