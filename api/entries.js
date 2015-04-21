var Entries = require('../models/Entry');

var entries = {
  /***************************/
  /**  Get With Query (500) **/
  /***************************/
  getAll: function(req, res){
    
    if(isEmpty(req.query)){
      // If no Query string exists, send this message
      res.json({message:"Please include something in the query string"});
      return;
    }
    // Find Entries based on query object, limit to 500
    Entries.find(req.query, null, {sort:{entry:1}, limit:500}, function(err, data){
      // Return Err
      if(err){
        res.json(err);
        return;
      }
      // Build response object for Ember
      var response_data = {
        entries: data
      };

      // Send Response data as JSON
      res.json(response_data);
      return;
    });
  },

  /*******************************/
  /**  Explicit 'Get All' Route **/
  /*******************************/
  getAllForce: function(req, res){
    // Retrieve all Entries
    Entries.find(function(err, data){
      if(err){
        // Return Error
        res.json(err);
        return;
      }
      // Return the Data
      res.json(data);
      return;
    });
  },

  /***************************/
  /**  Get Individual Entry **/
  /***************************/
  getOne: function(req, res){
    // Get entry with the ID req.param
    console.log(req.params);
    Entries.find({_id: req.params.id}, function(err, data){
      // Res Error if present
      if(err){
        res.json({
          message: err
        });
        return;
      }
      // Return as JSON
      res.json(data);
      return;
    });
  },
  create: function(req, res){
    Entries.create(req.body, function(err, data){
      if(err){
        res.json({
          mesaage:err
        });
        return;
      }
      res.json(data);
    });
  },
  update: function(req, res){

    req.body.lastModified = new Date();
    console.log(req.body);
    Entries.findByIdAndUpdate(req.params.id, req.body.entry, function(err, data){
      if(err){
        res.json({
          message:err
        });
        return;
      }
      res.json(data);
    });
  },
  delete: function(req, res){
    Entries.findByIdAndRemove(req.params.id, function(err, data){
      if(err){
        res.json({
          mesaage:err
        });
        return;
      }
      res.json(data);
    });
  }
}

/** Private Functions **/

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}


module.exports = entries;
