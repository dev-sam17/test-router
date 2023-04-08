const Product = require('../models/product');
const mongoose = require('mongoose');

async function getProducts() {
	const docs = await Product.find().select('name price _id').exec()

	const response = {
		count: docs.length,
		products: docs.map(doc => {
			return {
				name: doc.name,
				price: doc.price,
				_id: doc._id,
				request: {
					type: 'GET',
					url: 'localhost:3000/products/' + doc._id
				}
			}
		})
	}

	return response
}

async function createProduct(name, price) {
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: name,
		price: price,
	})
	const result = await product.save()
	return result
}

async function getProductById(id) {
	const doc = await Product.findById(id).select('name price _id').exec()
	if (doc) {
		const response = {
			name: doc.name,
			price: doc.price,
			_id: doc._id,
			request: {
				type: 'GET',
				description: 'Get all products',
				url: 'localhost:3000/products'
			}
		}
		return response
	} else {
		const response = {
			message: 'No valid Entry Found '
		}
		return response
	}
}

async function updateProductById(id, updateOps) {
	const result = await Product.findOneAndUpdate({_id: id}, { set: updateOps }, { new: true}).exec()
	const response = {
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
	}
	return response
}

async function deleteProductById(id) {
	const result = await Product.findByIdAndDelete(id).exec()
	const response = {
		message: "Deleted product successfully",
			deletedProduct: {
				name: result.name,
				price: result.price,
				_id: result._id,
				request: {
					type: 'DELETE'
				}
			}
	}
	return response 
}

module.exports = {
	getProducts,
	getProductById,
	createProduct,
	updateProductById,
	deleteProductById
}
