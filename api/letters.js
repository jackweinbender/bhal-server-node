var fs = require('fs');

/* GET home page. */
var letters = {
	getAll: function(req, res){
		fs.readFile('./data/letters.json', 'utf8', function (err,data) {
	    if (err) {
	      res.send(err);
	      return;
	    }
	    var json_data = JSON.parse(data);
	    res.json(json_data);
	    return;
	  });
	}
}

module.exports = letters;
