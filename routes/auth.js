const router = require('express').Router();
const Joi = require('joi');
const mongoose= require('mongoose')
const {joiuserSchema} = require('../models/user')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




router.post('/register', async(req, res) =>{
    const {error} = joiuserSchema.validate(req.body, {abortEarly:true})
    if(error){
        res.status(400).send(error.details[0].message)
    }

    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('email already exist')

    
    const usernameExist = await User.findOne({username: req.body.username})
    if(usernameExist) return res.status(400).send('username already exist')


    // hash the password
    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password ,salt)


    const newUser = new User ({
        username:req.body.username,
        fullname: req.body.fullname,
        password: hashedPassword,
        email: req.body.email
    })
    try {
        const savedUser = newUser.save()
        res.send(newUser)
        console.log('sasved')
    } catch (error) {
        res.send(error)
    }

})

router.post('/login', async(req, res)=>{
    const loginuser = await User.findOne({email: req.body.email})
    if(!loginuser){
        res.status(400).send('error invalid email')
    }

    const validpass = await bcrypt.compare(req.body.password, loginuser.password)
    if(!validpass){
        res.status(400).send('error password not corect')
    }

    const { password, ...others} = loginuser._doc
    const token = jwt.sign({id:loginuser._id, isAdmin: loginuser.isAdmin}, process.env.TOKEN, {expiresIn: '24h'})
    res.status(200).send({token, ...others})
    console.log('loged in')
})

module.exports= router