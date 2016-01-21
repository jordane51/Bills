'use strict';
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var LogsSchema = new Schema({
	billId: String,
	billName: String,
	group: [{userId: String, userName: String}],
	userId: String,
	action: String,
	amountBefore: Number,
	amountAfter: Number
});

module.exports = mongoose.model('Logs', LogsSchema);