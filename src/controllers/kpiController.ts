import { KYC } from "../model/kyc/kyc";
import { User } from "../model/user";
import { Request, Response } from "express";
import {
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_OK,
} from "../utils/status-code";
import { KYCStatus } from "../model/kyc/types";

/**
 * Fetches KPI data for Admin dashboard
 * @returns Promise<Response> - JSON response with KPI data
 */
const getKPI = async (req: Request, res: Response): Promise<any> => {
  try {
    const countUsers = User.countDocuments();
    const kycStatusCount = KYC.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
        },
      },
    ]);

    const [totalUsers, kycStats] = await Promise.all([
      countUsers,
      kycStatusCount,
    ]);

    const kycStatusCounts = kycStats.reduce((acc, { status, count }) => {
      acc[status] = count;
      return acc;
    }, {} as Record<KYCStatus, number>);

    const data = {
      totalUsers,
      approvedCount: kycStatusCounts[KYCStatus.Approved] || 0,
      rejectedCount: kycStatusCounts[KYCStatus.Rejected] || 0,
      pendingCount: kycStatusCounts[KYCStatus.Pending] || 0,
    };

    return res.status(HTTP_STATUS_OK).json(data);
  } catch (error) {
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error });
  }
};

export { getKPI };
