var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var morphologySchema = new Schema({
  // Properties
  data: String,
  // Relational properties
  // Timestamp info
  createdAt: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Morphology', morphologySchema);
