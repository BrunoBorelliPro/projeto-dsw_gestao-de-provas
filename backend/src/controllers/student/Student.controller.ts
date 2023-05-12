import { NextFunction, Request, Response } from "express";
import { StudentService } from "../../services/Student.service";
import { Student } from "../../entities/Student/Student";

export class StudentController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    console.log("[StudentController] /getAll");
    const studentService = new StudentService();
    try {
      const students = await studentService.getAll();
      res.status(200).json(students);
    } catch (error: any) {
      console.log("[StudentController] /getAll" + error.message);
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    console.log("[StudentController] /getById");
    const studentService = new StudentService();

    try {
      const { id } = req.params;

      const student = await studentService.getById(id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      return res.status(200).json(student);
    } catch (error: any) {
      console.log("[StudentController] /getById" + error.message);

      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    console.log("[StudentController] /create");
    const studentService = new StudentService();

    try {
      const { name } = req.body;
      const createdStudent = await studentService.create(new Student(name));
      return res.status(201).json(createdStudent);
    } catch (error: any) {
      console.log("[StudentController] /create" + error.message);
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    console.log("[StudentController] /update");
    const studentService = new StudentService();

    const { id } = req.params;
    const { name } = req.body;

    try {
      const updatedStudent = await studentService.update(id, new Student(name));
      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      return res.status(200).json(updatedStudent);
    } catch (error: any) {
      console.log("[StudentController] /update" + error.message);
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    console.log("[StudentController] /delete");
    const studentService = new StudentService();

    const { id } = req.params;

    try {
      await studentService.delete(id);
      return res.status(200).json({ message: "Student deleted" });
    } catch (error: any) {
      console.log("[StudentController] /delete" + error.message);
      next(error);
    }
  }
}
