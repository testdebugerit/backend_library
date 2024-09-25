const express = require("express");
const {
  login,
  register,
  registerAdmin,
  resetPassword,
  sendEmail,
} = require("../controllers/auth.controller.js");

const router = express.Router();

//register
router.post("/register", register);

//login
router.post("/login", login);

//register as admin
router.post("/register-admin", registerAdmin);

//send reset email
router.post("/send-email", sendEmail);

//reset password
router.post("/reset-password", resetPassword);

module.exports = router;
