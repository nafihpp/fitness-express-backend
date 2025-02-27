import express from "express";
import { getAllKYC, updateKYCStatus } from "../controllers/kycController";
import { authorizeAdmin } from "../middleware/admin";
const router = express.Router();

/**
 * Route for Add KYC
 */
router.post("/", updateKYCStatus);

/**
 * Route for Get KYC with status
 */
router.get("/me", updateKYCStatus);

//========ADMIN ROUTES ============================//

/**
 * Route for List All users with kyc (Admin)
 */
router.get("/", authorizeAdmin, getAllKYC);
/**
 *  Route for Update KYC status (Admin)
 */
router.patch("/update/:id", authorizeAdmin, updateKYCStatus);

export default router;
