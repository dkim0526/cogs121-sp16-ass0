var mongoose = require('mongoose');

var emailSchema = new mongoose.Schema({
	"email": String,
	"content": String,
	"created": Date
});

exports.email = mongoose.model('email', emailSchema);