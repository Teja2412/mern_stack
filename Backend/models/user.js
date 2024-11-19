const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      first_name: {
        type: String,
      },
      middle_name: {
        type: String,
        default: "",
      },
      last_name: {
        type: String,
      },
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    salt: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true } // Corrected this option
);

const User = mongoose.model("User", userSchema);
module.exports = User;
