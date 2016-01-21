var express = require('express');
var controller = require('./logs.controller');

var router = express.Router();

router.get('/user/:id', controller.showLogsForUser);

module.exports = router;