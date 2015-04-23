var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');


var auth = require('./auth');
	router.post('/', auth.login);


module.exports = router;