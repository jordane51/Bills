var express = require('express');
var controller = require('./bills.controller');

var router = express.Router();

router.get('/', controller.list);

module.exports = router;