
var Users = require('../models/User');


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
      res.json(data);
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
      res.json(data);
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
      res.json(data);
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
