const mongoose = require('mongoose');

// Define the schema
const flightSchema = new mongoose.Schema({
  Altitude: Number,
  HIS: Number,
  ADI: Number,
});

// Create the model from the schema
const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
