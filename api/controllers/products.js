const ProductsService = require('../services/products')
const mongoose = require('mongoose');

const Product = require('../models/products');

const getProducts = (req, res, next) => {
	Product.find().exec().then(docs => {
		console.log(docs);
		res.status(200).json(docs);
	}
	).catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		})
	});
}

const createProduct = (req, res, next) => {
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
	})
	product.save().then(result => {
		console.log(result);
		res.status(200).json({
			message: "handling POST requests to /products",
			createdProduct: result,
		})
	})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err,
			})
		});

//	const createdProduct = ProductsService.createProduct(product)

	
}

const getProductById = (req, res, next) => {
	const id = req.params.productId
	Product.findById(id).exec().then(doc => {
		console.log("from databae", doc);
		if (doc) {
			res.status(200).json(doc);
		} else {
			res.status(404).json({message: 'No valid entry found for this id'})
		}
	}).catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	});
}
//	const product = ProductsService.getProductById(id)

// 	if (!product) {
// 		return res.status(404).json({
// 			message: 'Product not found',
// 		})
// 	}
// 	res.status(200).json({
// 		product,
// 	})
// }

const updateProductById = (req, res, next) => {
	const id = req.params.productId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Product.findByIdAndUpdate(id, { $set: updateOps}).exec().then(result => {
		console.log(result);
		res.status(200).json(result);
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
		res.status(200).json(result);
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
