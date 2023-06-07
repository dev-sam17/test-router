const ProductsController = require('../controllers/products')
const express = require('express')
const router = express.Router()
// const checkAuth = require('../middleware/check-auth')

router.get('/', ProductsController.getProducts)

router.post('/',  ProductsController.createProduct)

router.get('/:product_id', ProductsController.getProductById)

router.patch('/:product_id', ProductsController.updateProductById)

router.delete('/:product_id',  ProductsController.deleteProductById)

module.exports = router
