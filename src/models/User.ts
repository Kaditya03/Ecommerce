import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "user",
    },

    photo: {
      type: String,
      default: "",
    },

    // ✅ FORGOT PASSWORD FIELDS (MUST BE INSIDE SCHEMA)
    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const User =
  models.User || mongoose.model("User", UserSchema);

export default User;
