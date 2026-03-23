const mongoose = require("mongoose");

const CustomerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  userName: String,
  userEmail: String,
  segment: { type: String, enum: ["active", "inactive", "high_spender"], default: "active" },
  totalSpent: { type: Number, default: 0 },
  courseCompletionRate: { type: Number, default: 0 },
  averageEngagementTime: { type: Number, default: 0 }, // in minutes
  lastActive: Date,
  tags: [String],
});

module.exports = mongoose.model("CustomerProfile", CustomerProfileSchema);
