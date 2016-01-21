var express = require('express');
var controller = require('./group.controller');

var router = express.Router();

//router.get('/', controller.index);
router.get('/groups', controller.list);
router.get('/groups/:id', controller.show);
router.post('/group', controller.create);

module.exports = router;