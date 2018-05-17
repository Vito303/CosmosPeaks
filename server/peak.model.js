const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const peakSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: String,
    url: String,
    latitude: String,
    longitude: String,
    height: String
  },
  {
    collection: 'peaks',
    read: 'nearest'
  }
);

const Peak = mongoose.model('Peak', peakSchema);

module.exports = Peak;
