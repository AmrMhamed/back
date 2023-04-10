const router = require('express').Router()
const { addProduct, getProduct, deleteProduct, getBySection, getByCategory } = require('../controller/productController')
const upload = require('../utilies/multer')

router.post('/add', upload.Multer.single('image'), addProduct)
router.get('/get/:id' , getProduct)
router.post('/delete' , deleteProduct)
router.post('/getBySection', getBySection)
router.post('/getByCategory', getByCategory)
module.exports = router