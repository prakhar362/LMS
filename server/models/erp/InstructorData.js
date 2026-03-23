const mongoose = require("mongoose");

const InstructorDataSchema = new mongoose.Schema({
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  assignedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  totalWorkloadHours: { type: Number, default: 0 },
  performanceRating: { type: Number, default: 5 },
  enrollmentsCount: { type: Number, default: 0 },
  revenueShare: { type: Number, default: 0 },
});

module.exports = mongoose.model("InstructorData", InstructorDataSchema);
