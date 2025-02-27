import mongoose, {  Schema } from "mongoose";

const KYCSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: [true, "Name is Required"] },
    email: { type: String, required: [true, "Email is Required"] },
    document: {
      type: String,
      required: [true, "ID Document is Required"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const KYC = mongoose.model("Kyc", KYCSchema);
