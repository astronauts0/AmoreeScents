const OTP = require("../models/otpModel");
const otpVerifyMail = require("../utils/mails/otpVerifyMail");

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const otpInstance = new OTP({ email, otp });
  await otpInstance.save();

  await otpVerifyMail(email, otp);

  res.status(200).json({
    success: true,
    message: `OTP sent to ${email} & expire in 5 minutes`,
  });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const otpRecord = await OTP.findOne({ email, otp });

  if (!otpRecord) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  res.status(200).json({ success: true, message: "OTP verified successfully" });
};
