const express = require("express");
const {
  signup,
  login,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserDetails,
} = require("../controller/user");
const router = express.Router();

// User signup route
router.post("/signup", signup);

// User login route
router.post("/login", login);

// Get all users route
router.get("/", getAllUsers);
router.get("/:id", getUserDetails);

// Update user route (using PUT)
router.put("/:id", updateUser);

// Delete user route (using DELETE)
router.delete("/:id", deleteUser);

module.exports = router;
