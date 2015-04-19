var errHandler = {
	production: function(err, req, res, next) {
	    res.status(err.status || 500);
	    res.json({
	        message: err.message,
	        error: {}
	    });
	},
	development: function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    },
    catchfof: function(req, res, next) {
	    var err = new Error('Not Found');
	    err.status = 404;
	    next(err);
	}
}

module.exports = errHandler;