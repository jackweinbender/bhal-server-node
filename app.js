/** Basic Reqires **/
var express = require('express');
var path = require('path');

/** Initialize App **/
var app = express();

var db = require('./database');

/* Logging and  Req'd Middleware */
var logger = require('morgan');
app.use(logger('dev'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var compression = require('compression');
app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));


/* Enable CORS Headers for all requests */
var cors = require('./middleware/CORS');
app.all('/*', cors.setHeaders);

/************/
/** Routes **/
/************/


/** OPEN **/
var login = require('./api/login');
app.use('/login', login);



/** Restrict API access to Logged in Users **/
// var auth = require('./api/auth');
// app.use(auth.loggedIn);
/********************************************/

/** Closed **/
var routes = require('./api/index');
app.use('/api/v1', routes);

// Utilities routes
var utils = require('./api/utils');
app.use('/utilities', utils);

/********************/
/** Error Handling **/
/********************/

var errHandler = require('./middleware/errHandler');
// catch 404 and forward to error handler
app.use(errHandler.catchfof);

  // development error handler (will print stacktrace)
  if (app.get('env') === 'development') {
      app.use(errHandler.development);
  }
  // production error handler (no stacktrace)
  app.use(errHandler.production);


module.exports = app;
