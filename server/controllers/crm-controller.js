const CustomerProfile = require("../models/crm/CustomerProfile");
const InteractionLog = require("../models/crm/InteractionLog");
const User = require("../models/User");

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

const sendRetentionEmails = async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const inactiveUsers = await User.find({
      lastLoginDate: { $lt: sevenDaysAgo },
      role: 'student'
    });

    // Mocking email sending
    inactiveUsers.forEach(user => {
      console.log(`Sending retention GMAIL to ${user.userEmail}: "We miss you, ${user.userName}! Come back and finish your courses to earn more credits!"`);
    });

    res.status(200).json({
      success: true,
      message: `Retention campaign processed for ${inactiveUsers.length} inactive users.`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Retention campaign error" });
  }
};

module.exports = { getCRMDashboardData, triggerCampaign, sendRetentionEmails };
