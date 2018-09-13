const Router = require('express').Router();
const {User, validateUser} = require('../../models/User');

Router.get("/", async(req, res)=>{
  const users = await User.find({});
  res.json(users)
})

Router.post('/register', async(req, res)=>{
  const {error} = validateUser(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({email: req.body.email})

  if(user) return res.status(400).json('User already exists')

  try{
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  
    const savedUser = await newUser.save();
    res.json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
    });
  }
  catch(e){
    res.status(500).json('Error occured')
  }
});

module.exports = Router;