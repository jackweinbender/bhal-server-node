var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var entrySchema = new Schema({
  // Properties
  entry: Number,
  word:  String,
  letter: String,
  root:   String,
  strongs: Number,
  page: Number,
  speech: String,
  basicDef: String,
  historicalForm: String,
  pattern: String,
  // Relational properties
  definition: Schema.Types.ObjectId,
  morphology: Schema.Types.ObjectId,
  etymology: Schema.Types.ObjectId,
  // Timestamp info
  createdAt: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Entry', entrySchema);
