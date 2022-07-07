const router = require('express').Router()
const Products = require('../models/product')
const {verifiedToken, verifiedTokenAuth, verifiedTokenAdmin}= require('./verify')

router.post('/create',verifiedTokenAdmin, async(req, res)=>{

    //check
    const existProduct = await Products.findOne({title: req.body.title})
    if(existProduct) return res.status(400).send('product already exist')


    const newProduct = new Products(req.body)
    try{
        const savedProduct= newProduct.save()
        res.status(200).json(savedProduct)
    }catch(err){
        res.status(400).send(err)
    }
})

router.put('/:id', verifiedTokenAdmin, async(req, res)=>{
    try {
        const updatedproduct = await Products.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        res.status(200).send(updatedproduct)
    } catch (error) {
        res.status.send(error)
    }
})

router.delete('/:id', verifiedTokenAdmin, async(req, res)=>{
    try{
        await Products.findByIdAndDelete(req.params.id)
        res.status(200).send('product has been deleted')
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/get/:id',async(req, res)=>{
    try{
        const porducts = await Products.findById(req.params.id)
        res.status(200).send(porducts)
    }catch(err){
        res.status(500).json(err)
    }
})


router.get('/allproduct', async(req, res)=>{
    const qNew = req.query.new
    const qCategory = req.query.category
    try{
        let products;

        if(qNew){
            products= await Products.find().sort({createdAt: -1}).limit(1)
        }else if(qCategory){
            products = await Products.find({category :{
                $in: [qCategory]
            }})
        }else{
            products = await Products.find()
        }
        res.status(200).send(products)
    }catch(err){
        res.status(400).send(err)
    }
})





module.exports= router