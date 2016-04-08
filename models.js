var mongoose = require('mongoose');

var emailSchema = new mongoose.Schema({
	"name": String,
	"email": String,
	"profile": String,
	"content": String,
	"created": Date
});

exports.email = mongoose.model('email', emailSchema);