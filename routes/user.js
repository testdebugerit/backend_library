const express = require("express");
const { getAllUsers, getById } = require("../controllers/user.controller.js");
const { verifyAdmin, verifyUser } = require("../utils/verifyToken.js");

const router = express.Router();

router.get("/", verifyAdmin, getAllUsers);

router.get("/:id", verifyUser, getById);

module.exports = router;
