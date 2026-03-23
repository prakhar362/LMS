const mongoose = require("mongoose");

const ForecastSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  courseTitle: String,
  predictedDemand: Number, // Estimated number of enrollments
  confidenceLevel: Number, // 0 to 1
  forecastDate: { type: Date, default: Date.now },
  period: String, // e.g., "Next 30 days"
  featuresUsed: [String], // ["historical_enrollment", "trending"]
});

module.exports = mongoose.model("Forecast", ForecastSchema);
