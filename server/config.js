'use strict';

//var url = "mongodb://localhost:27017/jordane51_Bills"

module.exports = {
	ip: '0.0.0.0',
	port: 3000,
	mongoDB: 'mongodb://localhost:27017/jordane51_Bills'	
};
/*
var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('Bills', server);

db.open(function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});
*/