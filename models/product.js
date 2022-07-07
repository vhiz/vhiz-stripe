
const mongoose= require('mongoose')



const productSchema = new mongoose.Schema({
    title: {type:String, require: true},
    description : {type: String, require: true},
    img:{type:String, require:true},
    category:{type:Array},
    size:{type:String},
    color:{type:String },
    price:{type:Number, require:true}
},
{timestamps: true});

module.exports = mongoose.model('Products', productSchema)