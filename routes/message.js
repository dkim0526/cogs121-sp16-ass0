var models = require('../models');

exports.send = function(req, res) {
  console.log(req.body); // help you see what is inside of req.body
    // your solution here
  var email = new models.email({
    email: req.body.email,
    content: req.body.content,
    created: Date.now()
  });

  email.save((err) => {
    (err) ? res.send(err) : res.redirect('/');
  });
};