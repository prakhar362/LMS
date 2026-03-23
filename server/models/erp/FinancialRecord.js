const mongoose = require("mongoose");

const FinancialRecordSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  amount: Number,
  currency: { type: String, default: "INR" },
  paymentMethod: String,
  transactionType: { type: String, enum: ["revenue", "refund"] },
  status: String, // "captured", "failed", "refunded"
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FinancialRecord", FinancialRecordSchema);
