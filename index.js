const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
require('dotenv/config');
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const oderRoutes = require('./routes/order')
const stripeRoutes = require('./routes/stripe')


mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log('connected to mongoose')
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.send('welcome')
});

app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/product', productRoutes)
app.use('/cart', cartRoutes)
app.use('/order', oderRoutes)
app.use('/', stripeRoutes)
var Port = process.env.PORT || 3002;
app.listen(Port, ()=>{
    console.log(`APP IS UP AT THIS PORT ${Port}`)
});