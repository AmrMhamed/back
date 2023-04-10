const { addCategory } = require('../controller/categoryController')

const router = require('express').Router()

router.post('/add', addCategory)

module.exports = router