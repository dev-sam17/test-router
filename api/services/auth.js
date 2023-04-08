const mongoose = require('mongoose');
const User = require('../models/user');

function addUser(email, password) {
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		email: email,
		password: password
	})

	user.save().then(result =>
		console.log(result.email)
	)
}


module.exports = {
	addUser,
}
