const jwt = require('jsonwebtoken'),
  mongoose = require('mongoose');
const User = mongoose.model('AllUsers');

module.exports= (req,res,next)=>{
  // authenticate the user with the token sent to the user
  const { authorization} = req.headers;
  if(!authorization){
    return res.status(401).send({
      error:"You must be logged in."
    });
  }
  const token = authorization.replace('Bearer ','');
  jwt.verify(token,'mysecretkey',async(err,payload)=>{
    if(err){
      return res.status(401).send({
        error:"You must be logged in."
      });
    }
    const { userId } = payload;
    const Userwhomadereuqest = await User.findById(userId);
    req.user = Userwhomadereuqest;
    next();
  })
}