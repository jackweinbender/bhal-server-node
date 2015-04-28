var mongoose = require('mongoose');

if(!process.env.NODE_ENV){
  var db = {
    DB_User: '',
    DB_PASSWORD: '',
    DB_HOST:'localhost:27017',
    DB_NAME:'bhal-server'
  }
} else {
  var db = process.env;
}

var login = 'mongodb://';
	if(db.DB_USER && db.DB_PASSWORD){
		login += db.DB_USER;
		login += ':';
		login += db.DB_PASSWORD;
		login += "@";
	}
	login += db.DB_HOST;
	login += '/';
	login += db.DB_NAME;

module.exports = mongoose.connect(login);