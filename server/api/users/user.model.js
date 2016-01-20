'use strict';
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
		name: String,
		email: String,
		password: String,
		token: String
});

UserSchema.statics = {
	encryptPassword: function(password){
		if(!password){
			return '';
		}
		return crypto.pbkdf2Sync (password, 'notActuallyASalt', 10000, 64).toString('base64');
	},
	generateToken: function(){
		return crypto.randomBytes(40).toString('base64');;
	}
}

UserSchema.methods = {
	checkPassword: function(password){
		return this.constructor.encryptPassword(password) === this.password;
	}
}

module.exports = mongoose.model('User', UserSchema);