var express = require('express');
var router = express.Router();
var auth = require('./auth');
var jwt = require('express-jwt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'BHAL API Version 1' });
});

var letters = require('./letters');
	router.get('/letters', letters.getAll);

var entries = require('./entries');
	router.get('/entries', entries.getAll);
	router.get('/entries/all', entries.getAllForce);
	router.get('/entries/:id', entries.getOne);
	// Auth Req'd
	router.post('/entries/', auth.loggedIn, entries.create);
	router.put('/entries/:id', auth.loggedIn, entries.update);
	router.delete('/entries/:id', auth.loggedIn, entries.delete);

var definitions = require('./definitions');
	router.get('/definitions', definitions.getAll);
	router.get('/definitions/all', definitions.getAllForce);
	router.get('/definitions/:id', definitions.getOne);
	// Auth Req'd
	router.post('/definitions/', auth.loggedIn, definitions.create);
	router.put('/definitions/:id', auth.loggedIn, definitions.update);
	router.delete('/definitions/:id', auth.loggedIn, definitions.delete);

var users = require('./users');
	// Auth Req'd
	router.get('/users', auth.loggedIn, users.getAll);
	router.get('/users/:id', auth.loggedIn, users.getOne);
	router.post('/users/', auth.loggedIn, users.create);
	router.put('/users/:id', auth.loggedIn, users.update);
	router.put('/users/:id/updatepassword', auth.loggedIn, users.updatePassword);
	router.delete('/users/:id', auth.loggedIn, users.delete);

module.exports = router;
