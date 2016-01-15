'use strict';
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var BillSchema = new Schema({
		title: String,
		description:String,
		amount: Number,
		group: {grouName: String}
	});

module.exports = mongoose.model('Bill', BillSchema);