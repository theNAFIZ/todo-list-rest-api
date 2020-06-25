'use strict';

var express = require('express');
var router = express.Router();
var Task = require('./models').Task;

router.param('id', function(req, res, next, id){
	Task.findById(id, function(err, task){
		if(err) return next(err);
		if(!task) {
			err = new Error();
			err.status = 404;
			return next(err);
		}
		req.task = task;
		return next();
	});
});


// Show all Tasks
router.get('/', function(req, res,next){
	Task.find({})
		.sort({time: 1})
		.exec(function(err, tasks){
			if(err) return next(err);
			res.json(tasks);
		});
});

// Create new Task
router.post('/', function(req, res, next) {
	var task = new Task(req.body);
	task.save(function(err, task){
		if(err) return next(err);
		res.status = 201;
		res.json(task);
	});
});

// Show Specific Task
router.get('/:id', function(req, res, next) {
	res.json(req.task);
});

// Update Specific Task
router.put('/:id', function(req, res, next) {
	req.task.updateOne(req.body, function(err, result){
		if(err) return next(err);
		res.json(result);
	});
});

// Delete Specific Task
router.delete('/:id', function(req, res) {
	req.task.delete(function(err){
		if(err) return next(err);
		res.json({msg: 'deleted'});
	});
});


module.exports = router;