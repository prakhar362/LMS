const mongoose = require("mongoose");

const CourseFeedbackSchema = new mongoose.Schema({
  courseId: String,
  studentId: String,
  studentName: String,
  instructorId: String,
  rating: Number,
  message: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CourseFeedback", CourseFeedbackSchema);
