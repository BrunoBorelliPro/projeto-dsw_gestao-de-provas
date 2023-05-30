import { NextFunction, Request, Response } from "express";

export default {
  isTeacherMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(`[isTeacherMiddleware] ${req.method} ${req.url}`);
    if (!req.body.teacher) {
      console.log("Unauthorized");
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  },
};
