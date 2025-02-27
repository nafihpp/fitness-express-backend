import { KYCStatus } from "../model/kyc/types";

export interface IKYC {
  userId        : string;
  name          : string;
  email         : string;
  document      : string;
  status        : KYCStatus; 
  createdAt?    : Date;
  updatedAt?    : Date;
}