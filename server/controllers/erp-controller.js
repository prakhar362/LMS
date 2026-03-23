const FinancialRecord = require("../models/erp/FinancialRecord");
const InstructorData = require("../models/erp/InstructorData");
const Course = require("../models/Course");

const getERPDashboardData = async (req, res) => {
  try {
    const financialRecords = await FinancialRecord.find().sort({ date: -1 });
    const totalRevenue = financialRecords.reduce((sum, r) => sum + r.amount, 0);
    
    const instructors = await InstructorData.find();
    
    // Aggregating revenue share
    const monthlyRevenue = await FinancialRecord.aggregate([
       { $group: { _id: { $month: "$date" }, total: { $sum: "$amount" } } }
    ]);

    res.status(200).json({
      success: true,
      data: { financialRecords, totalRevenue, instructors, monthlyRevenue }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "ERP dashboard error" });
  }
};

const manageInstructorRating = async (req, res) => {
   // Update rating/performance
   const { instructorId, rating } = req.body;
   await InstructorData.findOneAndUpdate({ instructorId }, { performanceRating: rating });
   res.status(200).json({ success: true, message: "Rating updated" });
};

module.exports = { getERPDashboardData, manageInstructorRating };
