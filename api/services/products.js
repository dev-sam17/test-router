const Product = require('../models/product');

function getProducts(callbackFunction) {

	Product.find().select('name price _id').exec().then((docs) => {
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
		
		callbackFunction(response)
	
	}).catch(error => {
		console.log(error);
		
		callbackFunction({
			error
		})
	});
}

module.exports = {
	getProducts,
}
