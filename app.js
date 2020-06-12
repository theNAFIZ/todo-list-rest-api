'use strict';

var express = require('express');
var app = express();
var routes = require('./routes');
var mongoose = require('mongoose');
var jsonParser = require('body-parser').json;
mongoose.set('useUnifiedTopology', true);

app.use(jsonParser());


// Database Connection

mongoose.connect("mongodb://localhost:27017/todolist",{useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', function(err){
	console.error("Connection error:",error);
});

db.once('open', function(){
	console.log("db connection successful.");
});

// Routes
app.use(routes);


// Error handling
app.use(function(req, res, next){
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});

var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log("Express server is listening on port",port);
});