const OrdersController = require('../controllers/orders')
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

router.get('/',checkAuth, OrdersController.getOrders)

router.post('/',checkAuth, OrdersController.createOrder)

router.get('/:orderId',checkAuth, OrdersController.getOrderById)

router.patch('/:orderId',checkAuth, OrdersController.updateOrderById)

router.delete('/:orderId',checkAuth, OrdersController.deleteOrderById)

module.exports = router;