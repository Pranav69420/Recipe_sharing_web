// Request password reset
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();
  const resetUrl = `http://localhost:${
    process.env.PORT || 8000
  }/reset-password/${resetToken}`;
  await sendMail({
    to: email,
    subject: "Password Reset",
    html: `<p>Click <a href='${resetUrl}'>here</a> to reset your password. This link expires in 1 hour.</p>`,
  });
  return res.json({ message: "Password reset email sent" });
};

// Reset password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await userModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Invalid or expired password reset token" });
  }
  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  return res.json({ message: "Password has been reset successfully" });
};
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendMail } = require("../utils/mailer");

const userSignUP = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Required fields cannot be empty" });
  }
  let user = await userModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  // Generate verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const newUser = await userModel.create({
    email,
    password: hashedPassword,
    verificationToken,
    isVerified: false,
  });
  // Send verification email
  const verifyUrl = `http://localhost:${
    process.env.PORT || 8000
  }/verify-email/${verificationToken}`;
  await sendMail({
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href='${verifyUrl}'>here</a> to verify your email.</p>`,
  });
  let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return res
    .status(200)
    .json({
      message:
        "User created successfully. Please check your email to verify your account.",
      token,
      newUser,
    });
};
// Email verification endpoint
const verifyEmail = async (req, res) => {
  const { token } = req.params;
  const user = await userModel.findOne({ verificationToken: token });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Invalid or expired verification token" });
  }
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
  return res.json({ message: "Email verified successfully" });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Required fields cannot be empty" });
  }
  let user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    let token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ message: "Login successful", token, user });
  } else {
    return res.status(400).json({ message: "Invalid email or password" });
  }
};

const getUser = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ email: user.email });
};

module.exports = {
  userSignUP,
  userLogin,
  getUser,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
};
