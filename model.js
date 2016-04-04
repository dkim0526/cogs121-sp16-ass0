var Mongoose = require('mongoose');

var emailSchema = new Mongoose.Schema({
	"email": String,
	"content": String,
	"created": Date
});

export.Email = Mongoose.model('email', emailSchema);