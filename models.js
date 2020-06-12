'use strict';

var mongoose = require('mongoose');

var sortTasks = function(a, b){
	// - b a
	// 0 unchanged
	// + a b
	if(a.time>b.time){
		return -1;
	} else if(b.time>a.time){
		return 1;
	} else {
		return 0;
	}
}

var Schema = mongoose.Schema;
var TaskSchema = new Schema({
	name: {type: String},
	description: {type: String},
	time: {type: Date},
	ongoing: {
		type: Boolean,
		default: false
	},
	done: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

var Task = mongoose.model('Task', TaskSchema);

module.exports.Task = Task;