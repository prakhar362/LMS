const express = require("express");
const router = express.Router();
const { getCRMDashboardData, triggerCampaign, sendNudgeEmail } = require("../controllers/crm-controller");
const { submitCourseFeedback, getInstructorFeedback } = require("../controllers/student-controller/feedback-controller");

router.get("/dashboard-data", getCRMDashboardData);
router.post("/trigger-campaign", triggerCampaign);
router.post("/course-feedback/submit", submitCourseFeedback);
router.get("/course-feedback/:instructorId", getInstructorFeedback);
router.post("/nudge", sendNudgeEmail);

module.exports = router;
