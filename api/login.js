var express = require('express');
var router = express.Router();
var secretKey = require('../config').secret;
var jwt = require('express-jwt');


var auth = require('./auth');
	router.post('/', auth.login);


module.exports = router;