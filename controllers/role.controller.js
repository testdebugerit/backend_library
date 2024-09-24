const Role = require("../models/Role.js");
const { CreateError } = require("../utils/error.js");
const { CreateSuccess } = require("../utils/success.js");

const createRole = async (req, res, next) => {
  try {
    if (req.body.role && req.body.role !== "") {
      const newRole = new Role(req.body);
      await newRole.save();
      return next(CreateSuccess(200, "Role Created!"));
    } else {
      return next(CreateError(400, "Bad Request: Role is required"));
    }
  } catch (error) {
    return next(CreateError(500, "Internal Server Error!"));
  }
};

const updateRole = async (req, res, next) => {
  try {
    const role = await Role.findById(req.params.id);
    if (role) {
      await Role.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return next(CreateSuccess(200, "Role Updated!"));
    } else {
      return next(CreateError(404, "Role not found!"));
    }
  } catch (error) {
    return next(CreateError(500, "Internal Server Error!"));
  }
};

const getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.find({});
    return res.status(200).json(roles);
  } catch (error) {
    return next(CreateError(500, "Internal Server Error!"));
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findById(roleId);
    if (role) {
      await Role.findByIdAndDelete(roleId);
      return next(CreateSuccess(200, "Role deleted!"));
    } else {
      return next(CreateError(404, "Role not found!"));
    }
  } catch (error) {
    return next(CreateError(500, "Internal Server Error!"));
  }
};

module.exports = {
  createRole,
  updateRole,
  getAllRoles,
  deleteRole,
};
