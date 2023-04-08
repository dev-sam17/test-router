const axios = require('axios')

main()

async function main() {
	try {
		console.log('starting request')

		await createProduct()
		await showAllProduct()
	} catch (error) {
		console.error(error)
	}
}

async function createProduct() {
	const response = await axios.post('http://localhost:3000/products', {
		name: 'New Axios Product',
		price: 555,
	})
	console.log(response.data)
}

async function showAllProduct() {
	const response = await axios.get('http://localhost:3000/products')
	console.log(response.data)
}
