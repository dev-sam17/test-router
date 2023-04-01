const OrdersService = require('../services/orders')

const getOrders = (req, res, next) => {
    res.status(200).json({
        orders: OrdersService.getOrders(),
    })
}

const createOrder = (req, res, next) => {
    const order = {
        id: String(new Date().getTime()),
        name: req.body.name,
        address: req.body.address,
    }

    const createdOrder = OrdersService.createOrder(order)

    res.status(200).json({
        createdOrder,
    })
}

const getOrderById = (req, res, next) => {
    const id = req.params.orderId
    const order = OrdersService.getOrderById(id)

    if (!order) {
        return res.status(404).json({
            message: 'Product not found',
        })
    }
    res.status(200).json({
        order,
    })   
}

const updateOrderById = (req, res, next) => {
    res.status(200).json({
        message: OrdersService.updateOrderById(
            req.params.orderId,
            req.body
        ),
    })
} 

const deleteOrderById = (req, res, next) => {
    res.status(200).json({
        message: OrdersService.deleteOrderById(
            req.params.orderId
        ),
    })
}

module.exports = {
    getOrders,
    createOrder,
    getOrderById,
    updateOrderById,
    deleteOrderById,
}