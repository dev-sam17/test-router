const ProductsController = require('../controllers/products')
const express = require('express')
const router = express.Router()

router.get('/', ProductsController.getProducts)

router.post('/', ProductsController.createProduct)

router.get('/:productId', ProductsController.getProductById)

router.patch('/:productId', ProductsController.updateProductById)

router.delete('/:productId', ProductsController.deleteProductById)

module.exports = router
