const mongoose = require("mongoose");

const CourseRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userName: String,
  requestedTopic: String,
  description: String,
  category: String,
  status: { type: String, enum: ["pending", "in-review", "implemented"], default: "pending" },
  votes: { type: Number, default: 1 }, // Other users can vote for the same demand
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CourseRequest", CourseRequestSchema);
