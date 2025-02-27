import mongoose, { Document } from "mongoose";

export interface IKYC extends Document {
  userId        : mongoose.Types.ObjectId;
  name          : string;
  email         : string;
  document      : string;
  status        : KYCStatus; 
  createdAt?    : Date;
  updatedAt?    : Date;
  reviewedBy    : mongoose.Types.ObjectId
}

export enum KYCStatus {
    Pending  = "pending",
    Approved = "approved",
    Rejected = "rejected",
}