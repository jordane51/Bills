'use strict';
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
		nameGroup: String,
		users: [{userName: String, userEmail: String}]
	});

module.exports = mongoose.model('Group', GroupSchema);