const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Fixing typo from 'timestamp' to 'timestamps'
  }
);

module.exports = mongoose.model("Role", RoleSchema);
