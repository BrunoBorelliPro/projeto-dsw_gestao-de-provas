import { NextFunction, Request, Response } from "express";

export default {
  isStudentMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(`[isStudentMiddleware] ${req.method} ${req.url}`);
    if (!req.body.student) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  },
};
