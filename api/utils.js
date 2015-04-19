var express = require('express');
var router = express.Router();

var dangerzone = require('./dangerzone');
router.post('/dangerzone/reload', dangerzone.reloadEntries);
router.post('/dangerzone/drop', dangerzone.dropCollections);

module.exports = router;
