import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import User from "../database/models/user";

interface AuthenticatedRequest extends Request {
    user?: User;
  }

const authorization = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
  }
  next();
};

const adminAuthorization = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
    if (req.user.role !== "admin") {
        return res.status(httpStatus.FORBIDDEN).json({ message: "Forbidden" });
    }
    next();
    }

export { authorization, adminAuthorization };
