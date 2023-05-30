import { NextFunction, Request, Response } from "express";
import TeacherService from "../services/Teacher.service";

export class TeacherController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    console.log("[TeacherController] /getAll");
    try {
      const teacherService = new TeacherService();
      const teachers = await teacherService.getAll();
      return res.status(200).json(teachers);
    } catch (error: any) {
      console.log("[TeacherController] /getAll" + error.message);
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    console.log("[TeacherController] /getById");
    try {
      const teacherService = new TeacherService();
      const { id } = req.params;
      const teacher = await teacherService.getById(id);
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      return res.status(200).json(teacher);
    } catch (error: any) {
      console.log("[TeacherController] /getById" + error.message);
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    console.log("[TeacherController] /create");
    try {
      const teacher = req.body;
      const teacherService = new TeacherService();
      const createdTeacher = await teacherService.create(teacher);
      return res.status(201).json(createdTeacher);
    } catch (error: any) {
      console.log("[TeacherController] /create" + error.message);
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    console.log("[TeacherController] /update");
    try {
      const { id } = req.params;
      const teacher = req.body;
      const teacherService = new TeacherService();
      const updatedTeacher = await teacherService.update(id, teacher);
      return res.status(200).json(updatedTeacher);
    } catch (error: any) {
      console.log("[TeacherController] /update" + error.message);
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    console.log("[TeacherController] /delete");
    try {
      const { id } = req.params;
      const teacherService = new TeacherService();
      const deletedTeacher = await teacherService.delete(id);
      return res.status(200).json(deletedTeacher);
    } catch (error: any) {
      console.log("[TeacherController] /delete" + error.message);
      next(error);
    }
  }
}
