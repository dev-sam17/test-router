const UserControllers = require('../controllers/user')
const express = require('express');
const router = express.Router();


router.post('/signup', UserControllers.userSignup)

router.post('/login', UserControllers.userLogin)

router.get('/', UserControllers.getUsers)

router.delete('/:userId', UserControllers.deleteUserById)



module.exports = router;