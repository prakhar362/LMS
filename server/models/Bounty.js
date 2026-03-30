const mongoose = require('mongoose');

const BountySchema = new mongoose.Schema({
  title: String,
  company: String,
  reward: String,
  tags: [String],
  type: String,
  submissions: { type: Number, default: 0 },
  url: String
});

module.exports = mongoose.model('Bounty', BountySchema);
