var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Users = require('../models/User');

if(process.env.NODE_HASH){
  var hash = process.env.NODE_HASH;
} else {
  var hash = 'b71854b00bcb67a60eaaf13f9b529500';
}
 
var auth = {
 
  login: function(req, res) {
 	
    var userEmail = req.body.email || '';
    var userPassword = req.body.password || '';
 
    if (userEmail == '' || userPassword == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "You must include both a email and password"
      });
      return;
    }


  	Users.findOne({email: userEmail}, '+password', function(err, dbUserObject){
  		// Check for error or null result
  		if(err || dbUserObject == null){
  			res.status(401);
  			res.json({
  				status: 401,
  				message: "No such email exists"
  			});
  		}
  		// Reassign hashsed password to variable
  		var passwordHash = dbUserObject.password;
  		// Remove password from user object
  		dbUserObject.password = undefined;

  		// Compare submitted password with hashed password with bcrypt
  		bcrypt.compare(userPassword, passwordHash, function(err, result){
  			// Respond with Error if there's a problem, or the password is wrong
  			if(err || result == false){
  				res.status(401);
  				res.json({
  					status: 401,
  					message:"Invalid password"
  				});
  				return;
  			}
  			// Otherwise, respond with the token and dbUserObject
        res.cookie('token', genToken(dbUserObject));
  			res.json(genToken(dbUserObject));
  			return;
  		});
  	});
  },

  loggedIn: function(req, res, next){
    if(!req.headers.authorization){
      res.status(401);
      res.json({
        status:401,
        message:"You must be logged in to use this API Endpoint"
      });
      return;
    }
    jwt.verify(req.headers.authorization, hash, function(err, decoded) {
      if(err){
        res.status(401);
        res.json({
          status:401,
          message:"Invalid webtoken",
          err: err
        });
        return;
      }
      next();
    });
  }
}
 
// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.sign(user, hash);
 
  return {
    token: token,
    expires: expires,
    user: user
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;