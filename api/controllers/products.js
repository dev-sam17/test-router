const ProductsService = require('../services/products')
const mongoose = require('mongoose');
const Product = require('../models/product');

const getProducts = async (req, res, next) => {
	try {
		const result = await ProductsService.getProducts()
		return res.json(result)
	} catch (error) {
		return res.status(500).json({ error })
	}
}

const createProduct = async (req, res, next) => {
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
				_id: result._id,
				request: {
					type: 'POST',
					url: 'localhost:3000/products/' + result._id
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

const getProductById = async (req, res, next) => {
	const id = req.params.productId
	try {
		const result = await ProductsService.getProductById(id)
		return res.json(result)
	} catch (error) {
		return res.status(500).json({ error })
	}
}

const updateProductById = async (req, res, next) => {
	const id = req.params.productId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	try {
		const response = await ProductsService.updateProductById(id, updateOps)
		console.log(response)
		return res.json(response)
	} catch (error) {
		return res.status(500).json({
			error: error
		})
	}
}

const deleteProductById = async (req, res, next) => {
	const id = req.params.productId;
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
