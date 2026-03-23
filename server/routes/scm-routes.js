const express = require("express");
const router = express.Router();
const { getSCMDashboardData, createForecast, createCourseRequest } = require("../controllers/scm-controller");

router.get("/dashboard-data", getSCMDashboardData);
router.post("/forecast", createForecast);
router.post("/course-request", createCourseRequest);


module.exports = router;
