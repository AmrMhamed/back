const router = require('express').Router()
const { addProduct, getProduct, deleteProduct, getBySection, getByCategory, getProducts } = require('../controller/productController')
const upload = require('../utilies/multer')

router.post('/add', upload.Multer.single('image'), addProduct)
router.get('/get/:id' , getProduct)
router.get('/' , getProducts)
router.post('/delete' , deleteProduct)
router.post('/getBySection', getBySection)
router.post('/getByCategory', getByCategory)
module.exports = router
