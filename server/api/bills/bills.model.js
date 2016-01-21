'use strict';
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var BillSchema = new Schema({
	title: String,
	//description:String,
	amount: Number,
	//group: {grouName: String}
	group: [{userId: String, owed: Number}]
});

module.exports = mongoose.model('Bill', BillSchema);