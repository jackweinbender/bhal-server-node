var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'BHAL API Version 1' });
});

var letters = require('./letters');
	router.get('/letters', letters.getAll);

var entries = require('./entries');
	router.get('/entries', entries.getAll);
	router.get('/entries/:id', entries.getOne);
	router.post('/entries/', entries.create);
	router.put('/entries/:id', entries.update);
	router.delete('/entries/:id', entries.delete);

var definitions = require('./definitions');
	router.get('/definitions', definitions.getAll);
	router.get('/definitions/:id', definitions.getOne);
	router.post('/definitions/', definitions.create);
	router.put('/definitions/:id', definitions.update);
	router.delete('/definitions/:id', definitions.delete);


module.exports = router;
