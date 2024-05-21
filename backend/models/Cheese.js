// backend/models/cheese.js

const mongoose = require('mongoose');

const cheeseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pricePerKilo: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Cheese = mongoose.model('Cheese', cheeseSchema);

module.exports = Cheese;
