const router = require('express').Router();
const Joi = require('joi');
const mongoose = require('mongoose');

//Import Model
const Genre = require('../../models/Genre');

//Connection to the database
mongoose.connect('mongodb://localhost:27017/vidly', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to the datbase...')
    })
    .catch(err => console.log(err))

//RESTFUL routes

//GET all routes
router.get('/', (req, res) => {
    Genre.find()
        .then(genres => res.json(genres))
})

//POST route
router.post('/', (req, res) => {
    const { error } = validationHandler(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const newgenre = {
        name: req.body.name
    }

    new Genre(newgenre)
        .save()
        .then(genre => res.json(genre))
})

//PUT route
router.put('/:id', (req, res) => {
    Genre.findById(req.params.id)
        .then(genre => {
            const { error } = validationHandler(req.body)
            if (error) return res.status(400).send(error.details[0].message)
            genre.name = req.body.name
            genre.save()
                .then(genre => {
                    res.json(genre)
                })
        })

        .catch(err => {
            return res.status(404).send('No such genre found')
        })

})

//DELETE route
router.delete('/:id', (req, res) => {
    Genre.findByIdAndRemove(req.params.id)
        .then((genre) => {
            res.json(genre)
        })
        .catch(err => res.status(404).send('No such genre found'))
})

//GET particular route
router.get('/:id', (req, res) => {
    Genre.findById(req.params.id)
        .then((genre) => {
            res.json(genre)
        })
        .catch(err => res.status(404).send('No such genre found'))
})

function validationHandler(genre) {
    const schema = {
        name: Joi.string().required().min(3)
    }
    return Joi.validate(genre, schema)
}

module.exports = router;