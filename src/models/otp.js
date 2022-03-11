const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema(
  {
    otp: String,
    phone: String,
  },{ timestamps: true });

const otpModel = mongoose.model("otpModel", otpSchema);

module.exports = otpModel;
