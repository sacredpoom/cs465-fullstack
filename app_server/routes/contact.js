var express = require('express');
var router = express.Router();
var controller = require('../controllers/contact');

/* GET travel page */
router.get('/', controller.contact);

module.exports = router;