var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var router = express.Router();

var auth = require('./auth');

// Routes
router.post('/login', auth.checkUser, auth.updateToken);
router.post('/register', auth.createUser, auth.updateToken);

module.exports = router;

