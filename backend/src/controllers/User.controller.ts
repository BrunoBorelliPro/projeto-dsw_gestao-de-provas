import { Request, Response } from "express";
import { StudentService } from "../services/Student.service";
import TeacherService from "../services/Teacher.service";

export class UserController {
  async get(req: Request, res: Response) {
    console.log(req.body);
    if (req.body.student) {
      const student = req.body.student;
      return res.status(200).json({ student, isTeacher: false });
    }
    if (req.body.teacher) {
      const teacher = req.body.teacher;
      return res.status(200).json({ teacher, isTeacher: true });
    }

    return res.status(404).json({ message: "User not found" });
  }
}
