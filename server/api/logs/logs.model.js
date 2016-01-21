'use strict';
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var LogsSchema = new Schema({
	billTitle: String,
	group: [{userId: String, userName: String}],
	userName: String,
	action: String,
	amountBefore: Number,
	amountAfter: Number
});

module.exports = mongoose.model('Logs', LogsSchema);