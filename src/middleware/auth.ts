import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkAuth = (req: any, res: Response, next: NextFunction): any => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  const token_payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  req.user = token_payload;
  next();
};
