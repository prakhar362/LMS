const Forecast = require("../models/scm/Forecast");
const SupplyLog = require("../models/scm/SupplyLog");
const Course = require("../models/Course");

const getSCMDashboardData = async (req, res) => {
  try {
    const forecasts = await Forecast.find();
    const supplyLogs = await SupplyLog.find().sort({ timestamp: -1 }).limit(10);
    
    // Aggregating capacity (basic simulation)
    const totalCourses = await Course.countDocuments();
    const supplyStats = await SupplyLog.aggregate([
       { $group: { _id: "$resourceType", total: { $sum: "$allocatedAmount" } } }
    ]);

    res.status(200).json({
      success: true,
      data: { forecasts, supplyLogs, supplyStats, totalCourses }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "SCM dashboard error" });
  }
};

const createForecast = async (req, res) => {
  try {
     const { courseId, predictedDemand, confidenceLevel, period } = req.body;
     const course = await Course.findById(courseId);
     const newForecast = new Forecast({
        courseId,
        courseTitle: course.title,
        predictedDemand,
        confidenceLevel,
        period,
        featuresUsed: ["historical_enrollment", "trending"]
     });
     await newForecast.save();

     // Simulation: SCM Push - auto-allocate instructor slots
     await SupplyLog.create({
        resourceType: "instructor_slot",
        courseId,
        allocatedAmount: Math.ceil(predictedDemand / 20), // 1 instructor slot per 20 predicted students
        allocationType: "pre-allocate"
     });

     res.status(201).json({ success: true, message: "Forecast and Push Supply triggered", data: newForecast });
  } catch (err) {
     res.status(500).json({ success: false, message: "Forecast error" });
  }
};

module.exports = { getSCMDashboardData, createForecast };
