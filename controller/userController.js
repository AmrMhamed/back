const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dm1yzcljo",
  api_key: "227383966397427",
  api_secret: "prDsQ5zxExtW_Tvbp5EZUK1ZZtU",
  secure: true,
});
const signUp = async (req, res) => {
 // return res.json(req.body)
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
//  const pic = req.file ? req.file.filename : undefined;

  if (!name || !email || !password ) {
    res.status(400).json("data is missing");
    return;
  }
 /* const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "products",
  }); */
  let data = await User.find({ email: email });
  if (data.length) {
    res.status(401).json("user already exist");
    return;
  }
  if (req.body.password !== req.body.password2) {
    res.status(400).json("Passwords must be equal");
    return;
  }
  bcrypt.hash(req.body.password, 10).then(async (hashed) => {
    try {
      let user = await User.create({
        name: name,
        email: email,
        password: hashed,
       // pic: result.url,
      });
    } catch {
      return res.status(400).json("Please enter all required fields");
    }
    res.status(200).json("signup sucessfully");
  });
};

const signIn = async (req, res) => {
  
  if(!req.body.email) return res.json("data is missing")
//  return res.json(req.body.email)
  let data = undefined
  try{
   data = await User.findOne({ email: req.body.email });
  }catch(err){
    return res.status(401).json(err)
  }
  if (!data) {
    return res.status(203).json("Email is not exist");
  }
  bcrypt.compare(req.body.password, data.password).then((same) => {
    if (!same) {
      return res.status(400).json("Password is not correct");
    }
    const token = jwt.sign(data.toJSON(), "HS256", {
      expiresIn: "24h",
    });
    return res.status(200).json({ token: token });
  });
};

const update = async (req, res) => {
  let user = await User.findById(req.body.id);
  let pic = req.file ? req.file.filename : user.pic;
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });
    pic = result.url;
  }
  if (req.body.password != req.body.password2)
    return res.status(400).json("passwords are not the same");
  let data = {
    name: req.body.name || user.name,
    password: req.body.password || user.password,
    pic: pic,
  };
  let temp = await User.findByIdAndUpdate(req.body.id, data);
  return res.status(200).json(temp);
};

module.exports = { signIn, signUp, update };
