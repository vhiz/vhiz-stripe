const router = require('express').Router()
require('dotenv/config')
const stripe = require('stripe')(process.env.STRIPE_SECERET_KEY)
const {verifiedToken, verifiedTokenAuth, verifiedTokenAdmin}= require('./verify')

router.post('/pay', verifiedToken,(req, res)=>{
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: req.body.currency
    },(stripeErr, stripeRes)=>{
        if(stripeErr){
            res.status(500).send(stripeErr)
        }else{
            res.status(200).send(stripeRes)
        }
    })
})


module.exports = router