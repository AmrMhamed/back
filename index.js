const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors())

const upload = require('./utilies/multer')

app.post('/', upload.Multer.single('image'), async(req,res)=>{
  const file = req.file.originalname
  console.log(req.file);
  const result = await cloudinary.uploader.upload(req.file.path,{
    folder:'products',
  })
  console.log(result);
  res.json(result)
})
mongoose.connect("mongodb+srv://amrmohamed09:CgmhOWTLnga6hrk2@cluster0.py6tdm5.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const categoryRoutes = require('./routes/categoryRoutes')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
app.use('/auth', authRoutes)
app.use('/product', productRoutes)
app.use('/category', categoryRoutes)
app.listen(8000, console.log('server is running on port 8000'))