const express = require("express");
const router = express.Router();
const { getSCMDashboardData, createForecast } = require("../controllers/scm-controller");

router.get("/dashboard-data", getSCMDashboardData);
router.post("/forecast", createForecast);

module.exports = router;
