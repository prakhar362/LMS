const mongoose = require("mongoose");

const InteractionLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: { type: String, enum: ["view_course", "wishlist", "purchase", "abandon_cart", "complete_lesson"] },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  metadata: Object,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("InteractionLog", InteractionLogSchema);
