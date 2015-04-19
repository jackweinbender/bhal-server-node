var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var definitionSchema = new Schema({
  // Properties
  blocks: [],
  // Relational properties
  forEntry: Number,
  entry: Schema.Types.ObjectId,
  // Timestamp info
  createdAt: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Definition', definitionSchema);
