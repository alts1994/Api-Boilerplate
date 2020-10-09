const mongoose = require('mongoose');
const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subscribedChannel: {
    type: String,
    required: true,
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Collection Name
module.exports = mongoose.model('subscriber', subscriberSchema);
