/**
 * Created by xhitedev on 12/13/15.
 */

var express = require('express');
var app = module.exports = express();
var config = require('./config');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var MongoClient = require('mongodb').MongoClient;

// Middlewares configuration
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
	secret: 'bills',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// MongoDB configuration
mongoose.connect(config.mongoDB, null);
mongoose.connection.on('error', function(err){
	console.error('MongoDB connection error: ' + err);
	}
);
mongoose.connection.once('open', function(){
	console.log('MongoDB connected');
});

// Routing API requests to their corresponding module
app.use('/api/bills', require('./api/bills'));
app.use('/api/users', require('./api/users'));
app.use('/api/logs', require('./api/logs'));
//app.use('/api/group', require('./api/group'));

// Routing AUTH requests
app.use('/auth', require('./auth'));

// Expose all the files in the client directory
app.use(express.static('client'));

// Send all unhandled requests to the index
app.get('/*', function(req, res){
	res.sendFile(path.resolve('client/index.html'));
});

// TEMP - remove when postInstall is done
var User = require('./api/users/user.model');
var Bill = require('./api/bills/bills.model');
var Logs = require('./api/logs/logs.model');

/*
		billId: String,
	group: [{userName: String, userEmail: String}],
	userId: String,
	action: String,
	amountBefore: Number,
	amountAfter: Number
	*/
User.find({}).remove(function(){
	Bill.find({}).remove(function(){
		Logs.find({}).remove(function(){
			User.create({email: 'test@test.com', password: User.encryptPassword('password'), token: 'AOGl2hvy1kH/wuvaZzLlTCF97ZmJqd89zTw6xv6PPenLuRHpldlpOA==', name: 'Demo user'}, function(err, docUser){
				Bill.create({title: 'Restaurant 20/01/2016', amount: '50', group: [{userId: docUser._id, owed: 10}]}, function(err, docBill){
					Logs.create({billTitle: docBill.title, group:  docBill.group,userName: docUser.name, action: 'reimburse', amountBefore: 10, amountAfter: 1});
					Logs.create({billTitle: docBill.title, group: docBill.group ,userName: docUser.name, action: 'delete'});
				});
			});
		});
	});
});


// Starting server
var server = app.listen(config.port, config.ip, function () {
	console.log('Server listening on http://%s:%s', config.ip, config.port);
});



/*
// Database connection.
var url = "mongodb://localhost/jordane51_Bills";
var db = mongoose.connect(url, function(err){
	if(err) { throw err}
});*/
/*
// Schemas (entities).
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
    email: String,
    passwd: String
});*/

// Si on a utilisé mongoose.connect()
//mongoose.connection.close();