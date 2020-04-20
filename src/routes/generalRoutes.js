const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const router = express.Router();

router.get('/', requireAuth, (req,res)=>{
  res.send(`your email is : ${req.user.email}`)
});

module.exports = router;