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

module.exports = {
	getProducts,
}
