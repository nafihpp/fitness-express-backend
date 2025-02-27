import express from "express";
import { getKPI } from "../controllers/kpiController";
const router = express.Router();

/**
 * Route for get the overall KYC data for the Admin. This will provide statistics like the
 * total number of users, approved, rejected, and pending KYC submissions.
 */
router.get("/", getKPI);

export default router;
