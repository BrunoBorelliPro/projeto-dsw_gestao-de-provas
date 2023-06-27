import { NextFunction, Request, Response } from "express";
import TeacherService from "../services/Teacher.service";

export class TeacherController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    console.log("[TeacherController] /getAll");
    const teacherService = new TeacherService();

    try {
      const teachers = await teacherService.getAll();
      return res.status(200).json(teachers);
    } catch (error: any) {
      console.log("[TeacherController] /getAll" + error.message);
      next(error);
    } finally {
      teacherService.close();
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    console.log("[TeacherController] /getById");
    const teacherService = new TeacherService();
    try {
      const { id } = req.params;
      const teacher = await teacherService.getById(id);
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      return res.status(200).json(teacher);
    } catch (error: any) {
      console.log("[TeacherController] /getById" + error.message);
      next(error);
    } finally {
      teacherService.close();
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    console.log("[TeacherController] /create");
    const teacherService = new TeacherService();
    try {
      const teacher = req.body;
      const createdTeacher = await teacherService.create(teacher);
      return res.status(201).json(createdTeacher);
    } catch (error: any) {
      console.log("[TeacherController] /create" + error.message);
      next(error);
    } finally {
      teacherService.close();
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    console.log("[TeacherController] /update");
    const teacherService = new TeacherService();
    try {
      const { id } = req.params;
      const teacher = req.body;
      const updatedTeacher = await teacherService.update(id, teacher);
      return res.status(200).json(updatedTeacher);
    } catch (error: any) {
      console.log("[TeacherController] /update" + error.message);
      next(error);
    } finally {
      teacherService.close();
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    console.log("[TeacherController] /delete");
    const teacherService = new TeacherService();
    try {
      const { id } = req.params;
      const deletedTeacher = await teacherService.delete(id);
      return res.status(200).json(deletedTeacher);
    } catch (error: any) {
      console.log("[TeacherController] /delete" + error.message);
      next(error);
    } finally {
      teacherService.close();
    }
  }
}
