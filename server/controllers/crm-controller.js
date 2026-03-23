const CustomerProfile = require("../models/crm/CustomerProfile");
const InteractionLog = require("../models/crm/InteractionLog");

const getCRMDashboardData = async (req, res) => {
  try {
    const customers = await CustomerProfile.find();
    const segmentsCount = await CustomerProfile.aggregate([
      { $group: { _id: "$segment", count: { $sum: 1 } } }
    ]);

    const lifecycleStats = await CustomerProfile.aggregate([
       { 
         $group: { 
           _id: "$lifecycleStage", 
           count: { $sum: 1 },
           avgCLV: { $avg: "$clv" },
           avgCAC: { $avg: "$cac" }
         } 
       }
    ]);
    
    const recentInteractions = await InteractionLog.find().sort({ timestamp: -1 }).limit(10);
    
    res.status(200).json({
      success: true,
      data: { customers, segmentsCount, lifecycleStats, recentInteractions }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "CRM dashboard error" });
  }
};


const triggerCampaign = async (req, res) => {
  try {
     // Simulation: send emails to abandoned cart users
     const interactions = await InteractionLog.find({ action: "abandon_cart" });
     // Here you'd use Nodemailer
     res.status(200).json({ success: true, message: `Campaign triggered for ${interactions.length} users` });
  } catch (err) {
     res.status(500).json({ success: false, message: "Campaign error" });
  }
};

module.exports = { getCRMDashboardData, triggerCampaign };
