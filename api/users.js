
var Users = require('../models/User');
var bcrypt = require('bcrypt');


/***************************/
/**  Get Definitions w/ Query **/
/***************************/

var users = {

  getAll: function(req, res){
    Users.find(function(err, data){
      if (err) {
        res.json({
          message: err
        });
        return;
      }
      res.json({users: data});
      return;
    });
  },
 
  getOne: function(req, res){
    Users.findById(req.params.id, function(err, data){
      if (err) {
        res.json({
          message: err
        });
        return;
      }
      res.json({user: data});
      return;
    });
  },
  create: function(req, res){
    Users.create(req.body, function(err, data){
      if (err) {
        res.json({
          message: err
        });
        return;
      }
      res.json({user: data});
      return;
    });
  },
  update: function(req, res){

    req.body.lastModified = new Date();

    Users.findByIdAndUpdate(req.params.id, req.body.user, function(err, oldData){
      if (err) {
        res.json({
          message: err
        });
        return;
      }
      res.json(oldData);
      return;
    });
  },
  updatePassword: function(req, res){
    if(!req.body.oldPassword || !req.body.newPassword){
      res.status(401);
      res.json({
        status: 401,
        message:"You must include both the old and new password"
      });
    }

    req.body.lastModified = new Date();

    Users.findById(req.params.id, '+password', function (err, oldUser) {
      if (err) {
        res.send(err);
        return;
      }

      bcrypt.compare(req.body.oldPassword, oldUser.password, function(err, result){
        // Respond with Error if there's a problem, or the password is wrong
        if(err || result == false){
          res.status(401);
          res.json({
            status: 401,
            message:"Invalid password"
          });
          return;
        }
        oldUser.password = req.body.newPassword;
        oldUser.save(function (err, newUser) {
          if(err){
            res.send(err);
            return;
          }
          newUser.password = undefined;
          res.json({user: newUser});
        });
      });
    });
  },
  delete: function(req, res){
    Users.findByIdAndRemove(req.params.id, function(err, removed){
      if (err) {
        res.json({
          message: err
        });
        return;
      }
      res.json(removed);
      return;
    });
  }
}

module.exports = users;
