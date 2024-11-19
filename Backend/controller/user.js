const bcrypt = require("bcrypt");
const User = require("../models/user"); // Adjust the path according to your structure

// Sign Up
const signup = async (req, res) => {
  const { name, username, password, email, dob, gender } = req.body;

  try {
    // Validate the request body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      name,
      username,
      password: hashedPassword,
      email,
      dob,
      gender,
    });

    // Save the user to the database
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Login

// Login
const login = async (req, res) => {
  const { identifier, password } = req.body; // Identifier could be username or email

  try {
    // Case-insensitive search for either email or username
    const user = await User.findOne({
      $or: [
        { username: { $regex: new RegExp("^" + identifier + "$", "i") } },
        { email: { $regex: new RegExp("^" + identifier + "$", "i") } },
      ],
    });

    if (!user) {
      console.log("User not found with identifier:", identifier); // Debugging message
      return res.status(404).json({ message: "User not found" });
    }

    // Log the found user
    console.log("User found:", user);

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Login successful
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Get All Users (Read)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const getUserDetails = await User.findOne({ _id: id });
    if (!getUserDetails) {
      res.status(401).json({ message: "User not found" });
    }
    res.status(200).json(getUserDetails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
};

// Update User
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// Export the controller functions
module.exports = {
  signup,
  login,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
};
