const Product = require('../models/product');

async function getProducts() {
	try {
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
	} catch (error) {
		console.error(error)
		return { error }
	}
}

module.exports = {
	getProducts,
}
