const express = require('express'),
  mongoose = require('mongoose');
/* JWT is used to prove a user is whom they say they are in essence */
const jwt = require('jsonwebtoken');
  /* instance of the User model */
const User = mongoose.model('AllUsers');
/* key to sign the tokem */
const KEY = "mysecretkey"
const router = express.Router();

/* new user signup */
router.post('/signup',async(req,res)=>{
  const {email, password} = req.body;
  
  try {
    const newUser = new User({email,password});
    await newUser.save();
    const token = jwt.sign({userId: newUser._id},KEY)
    res.send({token});
  } catch (err) {
    return res.status(422).send(err.message); //need better error message
  }
});
/* sign in process */
router.post('/signin',async(req,res)=>{
  const {email, password} = req.body;
  if(!email || !password)
    return res.status(422).send({error:'Must provide email and password'});
  const user = await User.findOne({email});
  if(!user) return res.status(422).send({error:'Invalid email'});
  
  try {
    await user.comparePassword(password)
    const token = jwt.sign({userId:user._id}, KEY);
    res.send({token})
  } catch (error) {
    console.log({
      error
    })
    return res.status(422).send({error:'Invalid password'});
  }

})

module.exports = router;