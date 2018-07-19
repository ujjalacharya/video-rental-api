const router = require('express').Router();
const User = require('../../models/User');
const Joi = require('joi');

router.get('/', async (req, res) => {
    let users = await User.find()
    res.json(users)
})

router.post('/', async (req, res) => {
    const { error } = validationHandler(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const newUser = {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    }
    let user = await new User(newUser)
    let saveduser = await user.save()
    res.json(saveduser)
})

router.put('/:id', async (req, res) => {
    const { error } = validationHandler(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    try {
        let user = await User.findById(req.params.id)
        if (user) {
            user.name = req.body.name,
                user.isGold = req.body.isGold,
                user.phone = req.body.phone
        }
        let userupdated = await user.save()
        res.json(userupdated)
    }
    catch (err) {
        res.status(404).send('No such user found')
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let user = await User.findByIdAndRemove(req.params.id)
        res.json(user)
    }
    catch (err) {
        res.status(404).send('No such user found')
    }
})

router.get('/:id', async (req, res) => {
    try{
        let user = await User.findById(req.params.id)
        res.json(user)
    }
   catch(err){
    res.status(404).send('No such user found')
   }
})

function validationHandler(user) {
    const schema = {
        name: Joi.string().required().min(3),
        isGold: Joi.boolean().required(),
        phone: Joi.number().required()
    }
    return Joi.validate(user, schema)
}

module.exports = router;