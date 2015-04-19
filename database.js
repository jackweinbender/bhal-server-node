var mongoose = require('mongoose');
var d = require('./config').database;

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