/**
 * Created by xhitedev on 12/13/15.
 */

var express = require('express');
var app = module.exports = express();
var config = require('./config');
var path = require('path');

var MongoClient = require('mongodb').MongoClient;

// Routing API requests to their corresponding module
app.use('/api/bills', require('./api/bills'));
// app.use('/api/users', require('./api/users'));
// app.use('/api/logs', require('./api/logs'));

// Expose all the files in the client directory
app.use(express.static('client'));

// Send all unhandled requests to the index
app.get('/*', function(req, res){
	res.sendFile(path.resolve('client/index.html'));
});

// Starting server
var server = app.listen(config.port, config.ip, function () {
	console.log('Server listening on http://%s:%s', config.ip, config.port);
});
