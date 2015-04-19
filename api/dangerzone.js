
var fs = require('fs');

// Models Needed
var Entry = require('../models/Entry');
var Definition = require('../models/Definition');

// Data for repopulation
var content = './data/content.json';

// Route functions
var dangerzone = {
  dropCollections: function(req, res, next){
    // Check for "Authentication" via POST request
    if(req.body.password == 'orviss152%'){
      // Drop Collections
      dropCollections();
      res.json({message: "Database cleared"})
      return;
    }
    res.json({
      status: 401,
      message:"Invalid Credentials"
    });
    return;
  },
  reloadEntries: function(req, res, next){

    // Check for "Authentication" via POST request
    if(req.body.password == 'orviss152%'){

      // Drop collections
      dropCollections();

      // Open raw data files and parse JSON
      fs.readFile(content, function(err, data){

        if(err){
          res.json(err);
          return;
        }

        var json = JSON.parse(data);

        // For each object in JSON array
        for(x=0; json.length > x; x++){
          // Execute function
          writeToMongo(json[x]);
        }
      
        res.json({message: 'Mongo reload started'});
        return;
      });
    } else {
      res.json({
        'status':401,
        'message':'Invalid Creds'
      });
      return;
    }
  }
}

/***********************/
/** Private Functions **/
/***********************/

function dropCollections(){
  Entry.remove({}, function(err) { 
    console.log('collection removed') 
  });
  Definition.remove({}, function(err) { 
    console.log('collection removed') 
  });
}

function writeToMongo(json){
    // Retrieve header data
    var entry = json.header;

    // Create Entry
    new Entry(entry).save(function(err, data){
      if(err){console.log(err);}
      // Create Definition Object
      var definition = {
        blocks: json.definitions,
        forEntry: json.header.entry,
        entry:data._id
      };

      // Create the Definition Object
      new Definition(definition).save(function(err, data){
        if(err){console.log(err);}
        // Update the Entry with Definition Reference
        Entry.findByIdAndUpdate(data.entry, { $set: { definition: data._id }}, function (err, data) {
        });
    });
  });
}

module.exports = dangerzone;
