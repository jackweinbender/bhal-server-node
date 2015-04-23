var mongoose = require('mongoose');
var config = require('./config');
var env = process.env.NODE_ENV || 'development';
var d = config[env].database;

var login = 'mongodb://';
	if(d.username && d.password){
		login += d.username;
		login += ':';
		login += d.password;
		login += "@";
	}
	login += d.host;
	login += '/';
	login += d.database;

module.exports = mongoose.connect(login);