const express = require("express");
const router = express.Router();
const {
  userSignUP,
  userLogin,
  getUser,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
} = require("../controller/userController");
// Password reset endpoints
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);

router.post("/signup", userSignUP);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", userLogin);
router.get("/user/:id", getUser);

module.exports = router;
