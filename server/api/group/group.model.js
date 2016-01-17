'use strict';
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
		nameGroup: String,
		members: [{pseudo: String, email: String}]
	});

module.exports = mongoose.model('Group', GroupSchema);