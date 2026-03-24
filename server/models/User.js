const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  password: String,
  role: String,
  credits: { type: Number, default: 0 },
  lastLoginDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);