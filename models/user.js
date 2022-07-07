const router = require('express').Router();
const bodyParser = require('body-parser')
const Joi = require('joi');
const mongoose= require('mongoose')



const joiuserSchema= Joi.object({
    username: Joi.string().required(),
    fullname: Joi.object({
        first: Joi.string().required(),
        last: Joi.string().required(),
      }),
    email: Joi.string().email().required(),
    
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.string().valid(Joi.ref('password'))

})

const userSchema = new mongoose.Schema({
    username: {type:String, require: true},
    fullname: ({
        first:{type: String, require:true},
        last: {type: String, required: true} 
    }),
    email : {type: String, require: true},
    password:{type:String, require:true},
    isAdmin: {type: Boolean, default: false}
},
{timestamps: true})

module.exports = mongoose.model('User', userSchema)
module.exports.joiuserSchema = joiuserSchema
