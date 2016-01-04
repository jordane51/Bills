/**
 * Created by xhitedev on 12/13/15.
 */

var express = require('express');
var app = module.exports =  express();

var config = require('./config');

var api = require('./api');
var client = require('./client');

app.use(api);
app.use(client);

var server = app.listen(config.port, config.ip, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Bills app listening at http://%s:%s', host, port);
});