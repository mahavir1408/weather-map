var express = require('express');
var router = express.Router();
router.get('*', require('../controllers/forecast')().index);
module.exports = router;
