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
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const pic = req.file ? req.file.filename : undefined;

  if (!name || !email || !password || !pic) {
    res.status(400).json("data is missing");
    return;
  }
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "products",
  });
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
        pic: result.url,
      });
    } catch {
      return res.status(400).json("Please enter all required fields");
    }
    res.status(200).json("signup sucessfully");
  });
};

const signIn = async (req, res) => {
  const data = await User.findOne({ email: req.body.email });
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
    res.status(200).json({ token: token });
  });
};

const update = async (req, res) => {
 // console.log(req.body);

  let user = await User.findById(req.body.id),
    temp ;
  if (req.body.password != req.body.password2)
    return res.status(500).json("passwords are not the same");
  let data;
  if (req.body.password != req.body.password2) {
    return res.status(500).json("passwords must be equal");
  }
  if (req.body.password != "***********") {
    data = {
      name: req.body.name || user.name,
      password: req.body.password,
    };

    bcrypt.hash(req.body.password, 10).then(async (hashed) => {
      try {
        temp = await User.findByIdAndUpdate(req.body.id, {
          name: req.body.name || user.name,
          password: hashed,
        });
      } catch {
        return res.status(500).json("Please enter all required fields");
      }
    });
  } else {
    data = {
      name: req.body.name || user.name,
    };
    temp = await User.findByIdAndUpdate(req.body.id, data);
  }
  data = {
    _id: req.body.id,
    name: req.body.name || user.name,
    email: req.body.email,
  };
  const token = jwt.sign(data, "HS256", {
    expiresIn: "24h",
  });
  return res.status(200).json({ token: token });
};

module.exports = { signIn, signUp, update };
