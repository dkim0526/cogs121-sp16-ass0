exports.view = function(req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var content = req.body.content;
    var models = require('../models');

    var data = {data: []};
    // res.render("index", data);
    console.log("THIS IS THE TEST");
    console.log(name);
    console.log(email);
    console.log(content);
    var express = require('express'); // Get the module
	var app = express(); // Create express by calling the prototype in var express
    models.email.find().exec(renderEmail);
    function renderEmail(err, email){
        if(err) console.log(err);
         res.render("index", {data: email});
    }


}
