var express = require('express');
var controller = require('./bills.controller');

var router = express.Router();

//router.get('/', controller.index);
router.get('/', controller.list);
router.get('/bills/:id', controller.show);
router.post('/bill', controller.create);

module.exports = router;