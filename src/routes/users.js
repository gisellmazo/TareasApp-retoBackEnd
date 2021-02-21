const express = require('express');
const router = express.Router();
const User = require('../models/Users')

router.get('/login', async(req, res)=>{
    const users = await User.find();
    console.log(users);
    res.json(users)
})

router.get('/signup', async(req, res)=>{
    const users = await User.find();
    console.log(users);
    res.json(users)
})

module.exports = router;