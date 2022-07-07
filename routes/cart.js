const router = require('express').Router()
const Cart = require('../models/cart')
const {verifiedToken, verifiedTokenAuth, verifiedTokenAdmin}= require('./verify')

router.post('/cart',verifiedToken, async(req, res)=>{
    const newCart = new Cart(req.body)
    try{
        const savedCart= newCart.save()
        res.status(200).json(newCart)
    }catch(err){
        res.status(400).send(err)
    }
})

router.put('/:id', verifiedTokenAuth, async(req, res)=>{
    try {
        const updatedcart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        res.status(200).send(updatedcart)
    } catch (error) {
        res.status.send(error)
    }
})

router.delete('/:id', verifiedTokenAuth, async(req, res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).send('cart has been deleted')
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/get/:id',verifiedTokenAuth,async(req, res)=>{
    try{
        const cart = await Cart.findOne({_id:req.params.id})
        res.status(200).send(cart)
    }catch(err){
        res.status(500).json(err)
    }
})


router.get('/allcarts', verifiedTokenAdmin, async(req,res)=>{
    try{
        const carts =await Cart.find()
        res.status(200).send(carts)
    }catch(err){
        res.status(400).send(err)
    }
})





module.exports= router