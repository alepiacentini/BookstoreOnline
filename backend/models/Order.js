const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  books: [{
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    quantity: Number
  }],
  total: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Order', orderSchema);