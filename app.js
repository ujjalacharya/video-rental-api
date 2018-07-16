const express = require('express');
const app = express();
const Joi = require('joi');
const PORT = process.env.PORT || 3000;

app.use(express.json());

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Romance' },
];

//RESTFUL routes

//GET all routes
app.get('/api/genres', (req, res) => {
    res.json(genres)
})

//POST route
app.post('/api/genres', (req, res) => {
    const { error } = validationHandler(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const newgenre = {
        id: genres.length + 1,
        name: req.body.name
    }
    
    genres.push(newgenre);
    res.json(newgenre)
})

//PUT route
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('No such genre found')

    const { error } = validationHandler(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    genre.name = req.body.name
    res.json(genre)
})

//DELETE route
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('No such genre found')

    const index = genres.indexOf(genre);
    genres.splice(index, 1)
    res.send(genre)
})

//GET particular route
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('No such genre found')
    res.json(genre)
})

app.listen(PORT, () => {
    console.log(`App started at ${PORT}`)
})

function validationHandler(genre) {
    const schema = {
        name: Joi.string().required().min(3)
    }
    return Joi.validate(genre, schema)
}