const OrdersController = require('../controllers/orders')
const express = require('express');
const router = express.Router();

router.get('/', OrdersController.getOrders)

router.post('/', OrdersController.createOrder)

router.get('/:orderId', OrdersController.getOrderById)

router.patch('/:orderId', OrdersController.updateOrderById)

router.delete('/:orderId', OrdersController.deleteOrderById)

module.exports = router;