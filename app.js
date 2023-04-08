const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config();

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/user')

mongoose.connect('mongodb+srv://samrock17:' + process.env.MONGO_ATLAS_PW + '@cluster0.poipsye.mongodb.net/?retryWrites=true&w=majority')
// mongoose.connect('mongodb+srv://samrock17:' + 'MONGO_ATLAS_PW' + '@cluster0.poipsye.mongodb.net/?retryWrites=true&w=majority')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Welcome to iMart',
	})
})

app.use((req, res, next) => {
	const error = new Error('Not found')
	error.status(404)
	next(error)
})

app.use((error, req, res, next) => {
	res.status(error.status || 500)
	res.json({
		error: {
			message: error.message,
		},
	})
})

module.exports = app
