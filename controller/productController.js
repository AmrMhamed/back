const Product = require("../models/productModel");
var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dm1yzcljo",
  api_key: "227383966397427",
  api_secret: "prDsQ5zxExtW_Tvbp5EZUK1ZZtU",
  secure: true,
});
const addProduct = async (req, res) => {
  const name = req.body.name,
    image = req.file ? req.file.filename : undefined,
    newArrival = req.body.newArrival ? req.body.newArrival : false,
    featured = req.body.featured ? req.body.featured : false,
    sizes = req.body.sizes,
    brand = req.body.brand;
  if (!name || !image) return res.status(400).json("data is missing");

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "products",
  });
  await Product.create({
    name: name,
    image: result.url,
    newArrival: newArrival,
    featured: featured,
    sizes: sizes,
    brand: brand,
  });
  return res.status(200).json("produst is added");
};

const getProduct = async (req, res) => {
  let result = await Product.findById(req.params.id);
  return res.status(200).json(result);
};

const deleteProduct = async (req, res) => {
  let result = await Product.findByIdAndDelete(req.body.id);
  return res.status(200).json(result);
};

const getBySection = async (req, res) => {
  const category = req.body.category,
    section = req.body.section;
  if (!category || !section) return res.status(400).json("data is missing");
  let result = await Product.find({ category: category, section: section });
  return res.json(result);
};

const getByCategory = async (req, res) => {
  const category = req.body.category;
  if (!category) return res.status(400).json("data is missing");
  let result = await Product.find({ category: category });
  return res.json(result);
};
module.exports = {
  addProduct,
  getProduct,
  deleteProduct,
  getBySection,
  getByCategory,
};
