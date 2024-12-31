const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['ERC20'],
    default: 'ERC20'
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

module.exports = mongoose.model('Wallet', walletSchema); 