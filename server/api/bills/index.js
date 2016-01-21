var express = require('express');
var controller = require('./bills.controller');
var logs = require('../logs/logs.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/user/:id', controller.findByUserId);
router.post('/', controller.create, logs.addLog);
router.put('/:id', controller.update, logs.addLog);
router.delete('/:id', controller.destroy, logs.addLog);

module.exports = router;