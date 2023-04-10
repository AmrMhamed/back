const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name :String,
    price :Number,
    image :String,
    newArrival:{type:Boolean, default:false},
    featured :{type:Boolean, default:false},
    sizes :[{type:String}],
    brand : String,
    category:String,
    section:String
})
module.exports = mongoose.model("product", productSchema);