const mongoose = require('mongoose');
const Product = require('../models/product');

function getProducts() {
	Product.find().select('name price _id').exec().then(docs => {
		const response = {
			count: docs.length,
			products: docs.map(doc =>{
				return {
					name : doc.name,
					price : doc.price,
					_id : doc._id,
					request: {
						type: 'GET',
						url: 'localhost:3000/products/' + doc._id
					}
				}
			})
		}
        return response
	}
	).catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		})
	});
}

function createProduct(product) {
	products.push(product)
	return product
}

function getProductById(id) {
	return products.filter((product) => product.id == id)[0]
}

function updateProductById(id, newProduct) {
	let updated = false

	console.log('updating product', id, newProduct)
	products = products.map((product) => {
		console.log('matching with', id, product.id == id)

		if (product.id == id) {
			updated = true
			console.log('matched updating')

			return { ...newProduct, id }
		}

		return product
	})

	return updated
}

function deleteProductById(id) {
	products = products.filter((product) => product.id != id)
	return true
}

module.exports = {
	getProducts,
	createProduct,
	getProductById,
	updateProductById,
	deleteProductById,
}
