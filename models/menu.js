const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuSchema = new Schema({
  foodName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('menu', menuSchema);

