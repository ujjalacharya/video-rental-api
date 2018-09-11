const router = require('express').Router();
const {Rental, validateRental} = require('../../models/Rental');
const {Customer} = require('../../models/Customer');
const Movie = require('../../models/Movie');

router.get('/', async(req, res)=>{
  const rentals = await Rental.find({}).sort('-dateOut')
  res.json(rentals)
});

router.post('/', async(req, res)=>{
  const {error} = validateRental(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  const customer = await Customer.findById(req.body.customerId);
  if(!customer) return res.status(400).send('Invalid Customer')

  const movie = await Movie.findById(req.body.movieId);
  if(!movie) return res.status(400).send('Invalid Movie')

  if(movie.numberInStock === 0) return res.status(400).send('Movie out of stock')

  const newCustomer = new Customer({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: customer.title,
      dailyRentalRate: customer.dailyRentalRate,
    }
  })
  const savedCustomer = await newCustomer.save();

  movie.numberInStock --;

  movie.save();

  res.send(savedCustomer);
})

module.exports = router;