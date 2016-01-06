'use strict';
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var BillSchema = new Schema({
		title: String,
		amount: Number,
		group: [{userName: String, userEmail: String}]
	});

module.exports = mongoose.model('Bill', BillSchema);