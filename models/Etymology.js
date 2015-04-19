var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var etymologySchema = new Schema({
  // Properties
  data: String,
  // Relational properties
  // Timestamp info
  createdAt: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Etymology', etymologySchema);
