const express = require('express');
const router = express.Router();
const User = require('../models/Users')
const passport = require('passport');

router.get('/login', async(req, res)=>{
    const users = await User.find();
    console.log(users);
    res.json(users)
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/signup', async(req, res)=>{
    const users = await User.find();
    console.log(users);
    res.json(users)
})

router.post('/signup', async (req, res)=>{
    const {email, user, password} = req.body;
    const errors = [];
    if(email.length <= 0){
        errors.push({text: "Por favor introduce tu correo"})
    }
    if(password.length > 5){
        errors.push({text: "La contraseña debe tener al menos 5 caracteres"})
    }else{
        const emailUser = await User.findOne({email: email});
        const newUser = new User({email, user, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save()
        //req.flash('success_msg', 'Ya estas registrado en TareasApp');
        
    }
   
})


module.exports = router;