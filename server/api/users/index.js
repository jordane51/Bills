var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth');

var router = express.Router();

router.get('/me', auth.isConnected, controller.show);
router.post('/password', auth.isConnected, controller.updatePassword);
router.get('/:id', auth.isConnected, controller.user);
router.get('/email/:email', auth.isConnected, controller.findByMail);

module.exports = router;