const router = require('express').Router();
const Joi = require('joi');
//Import Model
const {Genre} = require('../../models/Genre');


//RESTFUL routes

//GET all routes
router.get('/', async (req, res) => {
    const genresfind = await Genre.find()
    res.json(genresfind)
})

//POST route
router.post('/', async (req, res) => {
    const { error } = validationHandler(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const newgenre = {
        name: req.body.name
    }
    const genrepost = await new Genre(newgenre)
    const genresave = await genrepost.save();
    res.json(genresave)
})

//PUT route
router.put('/:id', async (req, res) => {
    try{
    const genreput = await Genre.findById(req.params.id)

    const { error } = validationHandler(req.body)
    if (error) return res.status(400).send(error.details[0].message)
        genreput.name = req.body.name
        const editedgenre = await genreput.save()

        res.json(editedgenre)

    }
    catch(ex){
        res.status(404).send('No such genre found')
    }

})


//DELETE route
router.delete('/:id', async (req, res) => {
    try {
        const deletegenre = await Genre.findByIdAndRemove(req.params.id)
        res.json(deletegenre);
    }
    catch (err) {
        res.status(404).send('No such genre found')
    }
})

//GET particular route
router.get('/:id', async (req, res) => {
    try{
    const particulargenre = await Genre.findById(req.params.id)
        res.json(particulargenre)
    }
    catch(err){
        res.status(404).send('No such genre found')
    }
})

function validationHandler(genre) {
    const schema = {
        name: Joi.string().required().min(3)
    }
    return Joi.validate(genre, schema)
}

module.exports = router;