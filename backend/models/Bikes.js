// backend/models/Bikes.js
const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Bike', bikeSchema);
