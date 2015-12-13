/**
 * Created by xhitedev on 12/13/15.
 */

var express = require('express');
var app = module.exports = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});
