import { Request, Response } from "express";
import {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_OK,
} from "../utils/status-code";
import { KYC } from "../model/kyc/kyc";

/**
 * Update KYC status (Admin only).
 * **Method**: `PATCH`
 * **Route**: `/kyc/:id`
 */
const updateKYCStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res
        .status(HTTP_STATUS_BAD_REQUEST)
        .json({ message: "Invalid status value." });
    }

    const kyc = await KYC.findByIdAndUpdate(id, { status }, { new: true });

    if (!kyc) {
      return res
        .status(HTTP_STATUS_NOT_FOUND)
        .json({ message: "KYC does not exist." });
    }

    res.status(HTTP_STATUS_OK).json({
      message: `KYC submission ${status}.`,
      kyc,
    });
  } catch (error) {
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json(error?.details);
  }
};

/**
 * Get all KYC submissions (Admin only)
 * **Method**: `GET`
 * **Route**: `/kyc`
 */
const getAllKYC = async (req: Request, res: Response): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;

    const query: any = {};
    if (status && ["pending", "approved", "rejected"].includes(status)) {
      query.status = status;
    }

    const totalDocs = await KYC.countDocuments(query);

    const kycs = await KYC.find(query)
      .populate("userId", "email")
      .populate("reviewedBy", "email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(HTTP_STATUS_OK).json({
      kycs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalDocs / limit),
        totalDocs,
      },
    });
  } catch (error) {
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch KYC submissions",
      error: error?.details || error?.message,
    });
  }
};

export { updateKYCStatus, getAllKYC };
