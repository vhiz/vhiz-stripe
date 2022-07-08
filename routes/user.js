const router = require('express').Router();
const {verifiedToken, verifiedTokenAuth, verifiedTokenAdmin}= require('./verify')
const User = require('../models/user')
const bcrypt = require('bcrypt');






router.put('/:id',verifiedTokenAuth ,async(req, res)=>{
    

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        res.status(200).send(updatedUser)
    } catch (error) {
        res.status.send(error)
    }
})

//

router.delete('/:id', verifiedTokenAuth, async(req, res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send('user has been deleted')
    }catch(err){
        res.status(500).json(err)
    }
})

//admin
router.get('/get/:id', verifiedTokenAdmin, async(req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).send(user)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/all', verifiedTokenAdmin, async(req, res)=>{
    const query = req.query.new;
    try{
        const users = query
        ? await User.find().sort({_id:-1}).limit(5)
        : await User.find();
        res.status(200).send(users)
    }catch(err){
        res.status(500).json(err)
    }
})



module.exports= router