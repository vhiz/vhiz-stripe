const router = require('express').Router()
const Order = require('../models/order')
const {verifiedToken, verifiedTokenAuth, verifiedTokenAdmin}= require('./verify')

router.post('/create',verifiedTokenAuth, async(req, res)=>{
    const newOrder = new Order(req.body)
    try{
        const savedOrder= newOrder.save()
        res.status(200).json("pending")
        console.log(savedOrder)
    }catch(err){
        res.status(400).send(err)
    }
})

router.put('/:id', verifiedTokenAuth, async(req, res)=>{
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        res.status(200).send(updatedOrder)
    } catch (error) {
        res.status.send(error)
    }
})

router.delete('/:id', verifiedTokenAuth, async(req, res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).send('cart has been deleted')
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/get/:id',verifiedTokenAuth,async(req, res)=>{
    try{
        const orders = await Order.find({_id:req.params.id})
        res.status(200).send(orders)
    }catch(err){
        res.status(500).json(err)
    }
})


router.get('/allcarts', verifiedTokenAdmin, async(req,res)=>{
    try{
        const orders =await Order.find()
        res.status(200).send(orders)
    }catch(err){
        res.status(400).send(err)
    }
})





module.exports= router