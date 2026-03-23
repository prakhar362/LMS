const mongoose = require("mongoose");

const SupplyLogSchema = new mongoose.Schema({
  resourceType: { type: String, enum: ["instructor_slot", "bandwidth", "storage"] },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  allocatedAmount: Number,
  allocationType: { type: String, enum: ["pre-allocate", "dynamic"] }, // push vs pull
  status: { type: String, default: "active" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SupplyLog", SupplyLogSchema);
