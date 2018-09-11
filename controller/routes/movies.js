const router = require('express').Router();
const {Genre} =require('../../models/Genre');
const Movie = require('../../models/Movie');
const Joi = require('joi');

router.get('/', async (req, res)=>{
    const movies = await Movie.find()
    res.json(movies)
})

router.post('/', async (req, res)=>{
    const { error } = validationHandler(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre =await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('No such genre found')
 
    const newmovie = {
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
            _id: genre._id,
            name: genre.name
        }
    }
    const moviepost = await new Movie(newmovie)
    const savedmovie = await moviepost.save()
    res.json(savedmovie);
})

module.exports = router;

function validationHandler(movie) {
    const schema = {
        title: Joi.string().required().min(3),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number(),
        genreId: Joi.string().required()
    }
    return Joi.validate(movie, schema)
}