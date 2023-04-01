const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    })
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(200).json({
        message: 'orders was created',
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: 'Order details',
        orderId : id
    });
});

router.patch('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated order'
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted order'
    });
});


module.exports = router;