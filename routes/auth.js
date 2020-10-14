const express = require('express');
const User = require('../models/user');
const router = express.Router();

// middleware - retrieve User by email;
async function getUser(req, res, next){
    try {
    user = await User.findOne({email: req.body.email});
      if (user == null) {
        return res.status(404).json({ message: 'Invalid email'});
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
  }

// authenticate credentials;
router.post('/', getUser, async (req, res)=>{
   try {
      passwordMatches = await user.comparePassword(req.body.password)
      }   catch (err) {
            return res.status(500).json({message: err.message})
    }
    return passwordMatches? res.status(200).json({message: "valid"}) : res.status(400).json({message: "invalid"})
})

module.exports = router;