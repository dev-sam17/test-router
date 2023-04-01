const ProductsService = require('../services/products')

const getProducts = (req, res, next) => {
	res.status(200).json({
		products: ProductsService.getProducts(),
	})
}

const createProduct = (req, res, next) => {
	const product = {
		id: String(new Date().getTime()),
		name: req.body.name,
		price: req.body.price,
	}

	const createdProduct = ProductsService.createProduct(product)

	res.status(200).json({
		createdProduct,
	})
}

const getProductById = (req, res, next) => {
	const id = req.params.productId
	const product = ProductsService.getProductById(id)

	if (!product) {
		return res.status(404).json({
			message: 'Product not found',
		})
	}
	res.status(200).json({
		product,
	})
}

const updateProductById = (req, res, next) => {
	res.status(200).json({
		message: ProductsService.updateProductById(
			req.params.productId,
			req.body
		),
	})
}

const deleteProductById = (req, res, next) => {
	res.status(200).json({
		message: ProductsService.deleteProductById(req.params.productId),
	})
}

module.exports = {
	getProducts,
	createProduct,
	getProductById,
	updateProductById,
	deleteProductById,
}
