const ProductsService = require('../services/products')
const mongoose = require('mongoose');
const Product = require('../models/product');

const getProducts = (req, res, next) => {
	console.log(ProductsService.getProducts())
	return res.status(200).json({message: "success"})
}

const createProduct = (req, res, next) => {
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
	})
	product.save().then(result => {
		console.log(result);
		res.status(201).json({
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
	})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err,
			})
		});	
}

const getProductById = (req, res, next) => {
	const id = req.params.productId
	Product.findById(id).select('name price _id').exec().then(doc => {
		console.log("from databae", doc);
		if (doc) {
			res.status(200).json({
				name : doc.name,
				price : doc.price,
				_id : doc._id,
				request: {
						type: 'GET',
						description: 'Get all products',
						url: 'localhost:3000/products'
					}
			});
		} else {
			res.status(404).json({message: 'No valid entry found for this id'})
		}
	}).catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	});
}

const updateProductById = (req, res, next) => {
	const id = req.params.productId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Product.findByIdAndUpdate(id, { $set: updateOps}).exec().then(result => {
		console.log(result);
		res.status(200).json({
			message: "Updated product successfully",
			updatedProduct: {
				name: result.name,
				price: result.price,
				_id: result._id,
				request: {
					type: 'PATCH',
					url: 'localhost:3000/products/' + result._id
				}
			}
		});
	}).catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		})
	});
}

const deleteProductById = (req, res, next) => {
	const id = req.params.productId;
	Product.findByIdAndDelete(id).exec().then(result => {
		res.status(200).json({
			message: "Deleted product successfully",
			deletedProduct: {
				name: result.name,
				price: result.price,
				_id: result._id,
				request: {
					type: 'DELETE'
				}
			}
		});
	}).catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		})
	});
}

module.exports = {
	getProducts,
	createProduct,
	getProductById,
	updateProductById,
	deleteProductById,
}
