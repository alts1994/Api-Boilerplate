const mongoose = require('mongoose');
const Schema = mongoose.Schema
const recordSchema = new mongoose.Schema({
  name:    {type:String, required:true},
  binary:  Buffer,
  boolean:  Boolean,
  updated: { type: Date, default: Date.now, required:true},
  age:     { type: Number, min: 18, max: 65 },
  mixed:   Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  decimal: Schema.Types.Decimal128,
  array: [],
  ofStrings: [String],
  ofNumbers: [Number],
  ofDates: [Date],
  ofBuffers: [Buffer],
  ofBooleans: [Boolean],
  ofMixeds: [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
  ofArrays: [[]],
  ofArrayOfNumbers: [[Number]],
  nested: {
    stuff: { type: String, lowercase: true, trim: true }
  },
  map: Map,
  mapOfString: {
    type: Map,
    of: String
  }
});

// Collection Name
module.exports = mongoose.model('record', recordSchema);
