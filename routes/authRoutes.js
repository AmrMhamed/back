const router = require('express').Router()
const { signUp, signIn, update } = require('../controller/userController')
const upload = require('../utilies/multer')
router.post('/signup'  , upload.Multer.single('image'), signUp)
router.post('/signin', signIn)
router.post('/update', upload.Multer.single('image'), update)
module.exports = router;
