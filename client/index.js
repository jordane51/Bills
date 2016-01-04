/**
 * Created by xhitedev on 12/13/15.
 */

var express = require('express');

var app = module.exports = express();

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.render('index.html');
});
