const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSignup = (req, res, next) => {
    User.find({email: req.body.email}).exec().then(user => {
        if(user.length >= 1){
            res.status(409).json({
                meesage: 'Email already exists. Please sign in or use a new  email'
            })
        } else{
            bcrypt.hash(req.body.password, 10, ((err, hash) => {
                if (err) {
                    res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })
                    user.save().then(result => {
                        console.log(result)
                        res.status(201).json({
                            message: "User created",
                            id: result.id,
                            email: result.email
                        })
                    }).catch(err => {
                        res.status(500).json({
                            error:err
                        })
                    })
                }
        }))
        }
    })  
}

const getUsers = (req, res, next) => {
    User.find().select('email _id').exec().then(docs => {
            const response = {
                count: docs.length,
                users: docs.map(doc => {
                    return {
                        email: doc.email,
                        User_id: doc._id
                    }
                })
            }
            res.status(200).json(response)
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
}

const userLogin = (req, res, next) =>{
    User.findOne({        
            email:req.body.email
        }).then(function (user) {
        if(!user) {
            res.status(409).json({
                message:'Auth failed'
            })
        } else {
            bcrypt.compare(req.body.password, user.password, ((err, result) => {
                if (result == true) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    }, process.env.JWT_KEY,
                    {
                        expiresIn: '1hr'
                    })
                    res.status(200).json({
                        message: 'Auth successful',
                        token : token
                    })
                } else {
                    res.status(409).json({
                        message:'Auth failed'
                    })
                }
            })
    )}
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}
    

const deleteUserById = (req, res, next) => {
    const id = req.params.userId;
    User.findByIdAndDelete(id).exec().then(result => {
        res.status(200).json({
            message: 'User Deleted'
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

module.exports = {
    getUsers,
    userSignup,
    userLogin,
    deleteUserById
}