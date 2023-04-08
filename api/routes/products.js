const ProductsController = require('../controllers/products')
const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

router.get('/', ProductsController.getProducts)

router.post('/', checkAuth, ProductsController.createProduct)

router.get('/:productId', ProductsController.getProductById)

router.patch('/:productId',checkAuth, ProductsController.updateProductById)

router.delete('/:productId', checkAuth, ProductsController.deleteProductById)

module.exports = router
