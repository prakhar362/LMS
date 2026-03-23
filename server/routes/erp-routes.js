const express = require("express");
const router = express.Router();
const { getERPDashboardData, manageInstructorRating } = require("../controllers/erp-controller");

router.get("/dashboard-data", getERPDashboardData);
router.post("/instructor-rating", manageInstructorRating);

module.exports = router;
