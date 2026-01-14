import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    age: {
      type: Number,
      required: true,
      min: 1
    },

    address: {
      type: String
    },

    phoneNumber: {
      type: String,
      required: true,
      match: [/^[6-9][0-9]{9}$/, "Invalid phone number"]
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"]
    },

    passwordHash: {
      type: String,
      required: true
    },

    avatar:{
      type:String,
      default:null
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
