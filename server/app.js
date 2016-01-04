/**
 * Created by xhitedev on 12/13/15.
 */

var express = require('express');
var app = module.exports = express();
var config = require('./config');

var MongoClient = require('mongodb').MongoClient;


app.get('/', function (req, res) {
    res.send('Hello World!');
});

var server = app.listen(config.port, config.ip, function () {
	console.log('Server listening on http://%s:%s', config.ip, config.port);
});
