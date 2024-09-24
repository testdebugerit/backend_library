const express = require("express");
const {
  createRole,
  deleteRole,
  getAllRole,
  updateRole,
} = require("../controllers/role.controller.js");
const { verifyAdmin } = require("../utils/verifyToken.js");

const router = express.Router();

//create a new role in db
router.post("/create", verifyAdmin, createRole);
//update
router.put("/update/:id", verifyAdmin, updateRole);
//get all roles
router.get("/getAll", getAllRole);
//delete role
router.delete("/deleteRole/:id", deleteRole);

module.exports = router;
