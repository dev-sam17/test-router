const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

const getOrders = (req, res, next) => {
    Order.find().select('_id product quantity').populate('product', '_id name').exec().then(docs =>{
        const response = {
            count: docs.length,
            orders : docs.map(doc =>{
                return {
                    id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity
                }
            })
        }
        res.status(200).json(response)
    }).catch(err => {
        console.log(err => {
            res.status(500).json({
                error: err
            })
        })
    })
    
}


const createOrder = (req, res, next) => {
    const product =req.body.productId;
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
    })
    Product.findById(product).then(doc => {
        if (doc) {
            order.save().then(result =>{
                console.log(result);
                res.status(201).json({
                    message: 'order placed successfully',
                    createdOrder : {
                        id : order._id,
                        product_id:doc._id,
                        name:doc.name,
                        quantity:order.quantity
                    }
                })
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
        } else {
            res.status(404).json({
                message: 'Product not found'
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    })  
}

const getOrderById = (req, res, next) => {
    const id = req.params.orderId
    Order.findById(id).select('_id quantity').populate('product', '_id name').exec().then(doc => {
        console.log("from database", doc);
        if (doc) {
            res.status(200).json({
                _id : doc._id,
                product: doc.product,
                quantity: doc.quantity
            })
        } else {
            res.status(404).json({
                message: 'No valid entry found for this id'
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    })
}

const updateOrderById = (req, res, next) => {
    const id = req.params.orderId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Order.findByIdAndUpdate(id, { $set: updateOps}).exec().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Updated Order Successfully',
            updatedOrder : {
                id: result._id,
                product_id: result.product,
                quantity: result.quantity
            }
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

const deleteOrderById = (req, res, next) => {
    const id = req.params.orderId;
    Order.findByIdAndDelete(id).exec().then(result => {
        res.status(200).json({
            message: "Deleted order successfully",
            deletedOrder: {
                id: result._id,
                quantity: result.quantity
            }
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

module.exports = {
    getOrders,
    createOrder,
    getOrderById,
    updateOrderById,
    deleteOrderById,
}