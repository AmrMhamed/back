const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name :String,
    sections:[{type:String}]
})
module.exports = mongoose.model("categorie", categorySchema);