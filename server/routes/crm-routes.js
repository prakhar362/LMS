const express = require("express");
const router = express.Router();
const { getCRMDashboardData, triggerCampaign } = require("../controllers/crm-controller");

router.get("/dashboard-data", getCRMDashboardData);
router.post("/trigger-campaign", triggerCampaign);

module.exports = router;
