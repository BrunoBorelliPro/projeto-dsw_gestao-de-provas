import dotenv from "dotenv";
import { Errback, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
dotenv.config();

export default {
  verifyJWT: (
    err: Errback,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const bearerHeader = req.headers["Authorization"] as string;
    if (!bearerHeader)
      return res
        .status(401)
        .json({ auth: false, message: "No token provided." });

    const token = bearerHeader.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ auth: false, message: "No token provided." });
    }
    const SECRET = process.env.SECRET as jwt.Secret;
    jwt.verify(token, SECRET, (err: any, decoded: any) => {
      if (err) {
        return res
          .status(500)
          .json({ auth: false, message: "Failed to authenticate token." });
      }
      req.body.userId = decoded.id;
      next();
    });
  },
};
