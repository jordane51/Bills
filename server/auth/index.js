var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('./user.model');
var auth = require('./auth');

var router = express.Router();

// Routes
router.post('/login', auth.checkUser, auth.updateToken);
router.post('/register', auth.createUser, auth.updateToken);

module.exports = router;

