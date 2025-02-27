import { NextFunction, Response } from "express";

export const authorizeAdmin = (req: any, res: Response, next: NextFunction): any => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access Denied: Admins Only" });
  }
  next();
};
