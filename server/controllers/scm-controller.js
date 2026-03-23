const Forecast = require("../models/scm/Forecast");
const SupplyLog = require("../models/scm/SupplyLog");
const CourseRequest = require("../models/scm/CourseRequest");
const Course = require("../models/Course");

const getSCMDashboardData = async (req, res) => {
  try {
    const forecasts = await Forecast.find();
    const supplyLogs = await SupplyLog.find().sort({ timestamp: -1 }).limit(10);
    const courseRequests = await CourseRequest.find().sort({ votes: -1 });

    const supplyStats = await SupplyLog.aggregate([
       { $group: { _id: "$resourceType", total: { $sum: "$allocatedAmount" } } }
    ]);

    res.status(200).json({
      success: true,
      data: { forecasts, supplyLogs, supplyStats, courseRequests, totalCourses: await Course.countDocuments() }
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
     
     await SupplyLog.create({
        resourceType: "instructor_slot",
        courseId,
        allocatedAmount: Math.ceil(predictedDemand / 20),
        allocationType: "pre-allocate"
     });

     res.status(201).json({ success: true, message: "Forecast Logged", data: newForecast });
  } catch (err) {
     res.status(500).json({ success: false });
  }
};

const createCourseRequest = async (req, res) => {
  try {
     const { topic, category, description, userId, userName } = req.body;
     const newRequest = new CourseRequest({ requestedTopic: topic, category, description, userId, userName });
     await newRequest.save();

     res.status(201).json({ success: true, message: "Demand Logged", data: newRequest });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

module.exports = { getSCMDashboardData, createForecast, createCourseRequest };
