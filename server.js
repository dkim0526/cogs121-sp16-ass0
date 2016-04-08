// Node.js Dependencies
const http = require("http");
const path = require("path");
var handlebars = require("express-handlebars");
var mongoose = require("mongoose");

var express = require('express');
var app = express();

var router = {
    index: require("./routes/index"),
    email: require("./routes/message")
};

var parser = {
    body: require("body-parser")
};



// Database Connection
var db = mongoose.connection;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/cogs121');
db.on('error', console.error.bind(console, 'Mongo DB Connection Error:'));
db.once('open', function(callback) {
    console.log("Database connected successfully.");
});

// Middleware
app.set("port", process.env.PORT || 3000);
app.engine("html", handlebars());
app.set("view engine", "html"); 
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(parser.body.urlencoded({ extended: false }));
app.use(parser.body.json());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// Routes
app.get("/", router.index.view);
// POST method route
app.post("/message", router.email.send);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}


// Start Server
http.createServer(app).listen(app.get("port"), function() {
    console.log("Express server listening on port " + app.get("port"));
});
