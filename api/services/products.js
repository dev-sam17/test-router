let products = [
	{
		id: '1',
		name: 'Product 1',
		price: 100,
	},
	{
		id: '2',
		name: 'Product 2',
		price: 200,
	},
]

function getProducts() {
	return products
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
