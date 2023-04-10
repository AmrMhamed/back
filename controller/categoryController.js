const Category = require("../models/categoryModel");
const addCategory = async(req,res)=>{
    const name = req.body.name,
          sections = req.body.sections
    console.log(req.body);
    if(!name)
        return res.status(400).json('data is missing')
    await Category.create({
        name:name,
        sections:sections
    })
    return res.status(200).json('category added')
}

const addSection = async(req,res)=>{
    const sections = req.body.sections
    await Category.findByIdAndUpdate(req.body.id, {$addToSet:{sections:sections}})
    return res.status(200).json('done')
}

module.exports = {addCategory, addSection};
