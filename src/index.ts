import express from "express";
import connectDb from "./config/db";
import cors from "cors";
import dotenv from "dotenv";
import { AllowedCors } from "./config/cors";
import { limiter } from "./config/rate-limiter";
import authRotes from "./routes/authRoute";
import kycRoutes from "./routes/kycRoute";
import kpiRoutes from "./routes/kpiRoutes";
import { checkAuth } from "./middleware/auth";
import { createSocketServer } from "./utils/custom-utils";

const app = express();
dotenv.config();
app.use(express.json());

connectDb();

/** Apply rate limiter to all requests **/
app.use(limiter);

/** CORS Configuration */
app.use(cors(AllowedCors));

/** Authentication Routes */
app.use("/auth", authRotes);

/** KYC Routes */
app.use("/api/kyc", checkAuth, kycRoutes);

/** KPI Routes */
app.use("/api/kpi", checkAuth, kpiRoutes);

const port = Number(process.env.PORT) || 3003;

const server = app.listen(port, () =>
  console.log(`[server]: app listening on port ${port}!`)
);

createSocketServer(server);
