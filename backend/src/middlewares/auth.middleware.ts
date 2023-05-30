import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import TeacherService from "../services/Teacher.service";
import { StudentService } from "../services/Student.service";
dotenv.config();
export default {
  async authMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(`[AuthMiddleware] ${req.method} ${req.url}`);
    try {
      const bearerHeader = req.headers["authorization"];
      const token = bearerHeader?.split(" ")[1];

      if (!token) {
        console.log("[AuthMiddleware] No token provided");
        return res.status(401).json({ message: "No token provided" });
      }
      const JWT_SECRET = process.env.JWT_SECRET as Secret;

      const decoded = jwt.verify(token, JWT_SECRET) as {
        id: string;
        user_id: string;
        isTeacher: boolean;
        iat: number;
        exp: number;
      };

      if (decoded) {
        if (decoded.isTeacher) {
          let teacherService = new TeacherService();
          let teacher = await teacherService.getById(decoded.id);
          if (!teacher) {
            console.log("[AuthMiddleware] Teacher not found");
            return res.status(404).json({ message: "Teacher not found" });
          }
          req.body.teacher = teacher;
          console.log("[AuthMiddleware] Teacher found");
        } else {
          let studentService = new StudentService();
          let student = await studentService.getById(decoded.id);
          if (!student) {
            console.log("[AuthMiddleware] Student not found");
            return res.status(404).json({ message: "Student not found" });
          }
          console.log("[AuthMiddleware] Student found");
          req.body.student = student;
        }
      } else {
        console.log("[AuthMiddleware] Invalid token");
        return res.status(401).json({ message: "Invalid token" });
      }
    } catch (err) {
      console.log("[AuthMiddleware] Invalid token");
      return res.status(401).json({ message: "Invalid token" });
    }

    next();
  },
};
