const mongoose = require('mongoose');

const exchangeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Binance', 'BitGet']
  },
  apiKey: {
    type: String,
    required: true
  },
  apiSecret: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Exchange', exchangeSchema); 