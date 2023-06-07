const ProductsService = require('../services/products')

const getProducts = async (req, res) => {
	try {
		const result = await ProductsService.getProducts()
		return res.json(result)
	} catch (error) {
		return res.status(500).json({ error })
	}
}

const createProduct = async (req, res) => {
	const name = req.body.name
	const price = req.body.price
	try {
		const result = await ProductsService.createProduct(name, price)
		console.log(result);
		return res.status(201).json({
			message: "Created product successfully",
			createdProduct: {
				name: result.name,
				price: result.price,
				id: result.product_id,
				request: {
					type: 'POST',
					url: 'localhost:3000/products/' + result.product_id
				}
			}
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: error,
		})
	}
}

const getProductById = async (req, res) => {
	const id = req.params.product_id
	try {
		const result = await ProductsService.getProductById(id)
		return res.json(result)
	} catch (error) {
		return res.status(500).json({ error })
	}
}

const updateProductById = async (req, res) => {
	const id = req.params.product_id;
	const name = req.body.name;
	const price = req.body.price;
	
	try {
		const response = await ProductsService.updateProductById(id, name, price)
		console.log(response)
		return res.json(response)
	} catch (error) {
		return res.status(500).json({
			error: error
		})
	}
}

const deleteProductById = async (req, res) => {
	const id = req.params.product_id;
	try {
		const response =await ProductsService.deleteProductById(id)
		console.log(response)
		return res.status(200).json(response)
	} catch (error) {
		return res.status(500).json({
			error: error
		})
	}
}

module.exports = {
	getProducts,
	createProduct,
	getProductById,
	updateProductById,
	deleteProductById,
}
