const router = require('express').Router();
const {Customer} = require('../../models/Customer');
const Joi = require('joi');

router.get('/', async (req, res) => {
    let customers = await Customer.find()
    res.json(customers)
})

router.post('/', async (req, res) => {
    const { error } = validationHandler(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const newCustomer = {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    }
    let customer = await new Customer(newCustomer)
    let savedcustomer= await customer.save()
    res.json(savedcustomer)
})

router.put('/:id', async (req, res) => {
    const { error } = validationHandler(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    try {
        let customer = await Customer.findById(req.params.id)
        if (customer) {
            customer.name = req.body.name,
            customer.isGold = req.body.isGold,
            customer.phone = req.body.phone
        }
        let customerupdated = await customer.save()
        res.json(customerupdated)
    }
    catch (err) {
        res.status(404).send('No such Customer found')
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let customer = await Customer.findByIdAndRemove(req.params.id)
        res.json(customer)
    }
    catch (err) {
        res.status(404).send('No such customer found')
    }
})

router.get('/:id', async (req, res) => {
    try{
        let customer = await Customer.findById(req.params.id)
        res.json(customer)
    }
   catch(err){
    res.status(404).send('No such customer found')
   }
})

function validationHandler(customer) {
    const schema = {
        name: Joi.string().required().min(3),
        isGold: Joi.boolean().required(),
        phone: Joi.number().required()
    }
    return Joi.validate(customer, schema)
}

module.exports = router;