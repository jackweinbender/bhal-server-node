
var Definitions = require('../models/Definition');


/***************************/
/**  Get Definitions w/ Query **/
/***************************/

var definitions = {

  getAll: function(req, res){
   if(isEmpty(req.query)){
    // If no Query string exists, send this message
    res.json({message:"Plesae include something in the query string"});
    return;
    }
    // Find Definitions based on query object, limit to 500
    Definitions.find(req.query, null, {sort:{forEntry:1}, limit:25}, function(err, data){
      // Return Err
      if(err){
        res.json(err);
        return;
      }
      res.json({
          definitions: data
      });
      return;
    });
  },
  /*******************************/
  /**  Explicit 'Get All' Route **/
  /*******************************/
  getAllForce: function(req, res){
    Definitions.find(function(err, data){
      if(err){
        // Return Error
        res.json(err);
        return;
        }
      // Return as JSON for Ember
      res.json({
        definitions: data
      });
      return;
    });
  },
  getOne: function(req, res){
    // Get entry with the ID req.param
    Definitions.find({_id: req.params.id}, function(err, data){
      // Res Error if present
      if(err){
          res.json({message: err});
          return;
      }
      // Return as JSON for Ember
      res.json({
        definitions: data
      });
      return;
    });
  },
  create: function(req, res){
    Definitions.create(req.body, function(err, data){
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
    console.log(req.body.definition);
    Definitions.findByIdAndUpdate(req.params.id, req.body.definition, function(err, data){
      if(err){
        res.json({
          message:err
        });
        return;
      }
      res.status(200);
      res.json({definition: data});
    });
  },
  delete: function(req, res){
    Definitions.findByIdAndRemove(req.params.id, function(err, data){
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

module.exports = definitions;
