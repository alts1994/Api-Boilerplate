const express = require('express');
const User = require('../models/user');
const router = express.Router();

// middleware - retrieve User
async function getUser(req, res, next){
    try {
      user = await User.findById(req.params.id);
      console.log(user);
      if (user == null) {
        return res.status(404).json({ message: 'Cannot find user - UserID does not exist' });
      }
    } catch (err) {
      return res.status(500).json({ message: `${err.message} || UserID may be invalid` });
    }
    res.user = user;
    next();
  }

// middleware - check if email is unique
async function isEmailUnique(req, res, next){
    if(!req.body.email) return next()
    try{
        const email = await User.findOne({email: req.body.email});
        if(email){
            return res.status(401).json({message: 'Email already exists'})
        };
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    next();
}

// Get One User
router.get('/:id', getUser, (req, res)=>{
    res.json(res.user);
})

// Create User
router.post('/', isEmailUnique, async(req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    })

    try{
        const newUser = await user.save();
        res.status(201).json(newUser); 
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

// Update User
router.patch('/:id', getUser, isEmailUnique, async(req, res) =>{
    if(req.body.email != null) {
        res.user.email = req.body.email; 
    }

    if(req.body.password != null){
        res.user.password = res.hashedPassword;
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    }catch (err) {
        console.log(err);
        res.status(400).json({message: err.message})
    }
} )
  
// Delete one user
router.delete('/:id', getUser, async (req, res) => {
 try {
      await res.user.remove();
      res.json({ message: 'User Deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;