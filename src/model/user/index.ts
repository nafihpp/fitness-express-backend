import mongoose, { Schema } from "mongoose";
import { IUser, RoleEnum } from "./types";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already Registered"],
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "Please provide a valid email address.",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: 8,
    },
    role: {
      type: String,
      enum: Object.values(RoleEnum),
      default: RoleEnum.USER,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);

