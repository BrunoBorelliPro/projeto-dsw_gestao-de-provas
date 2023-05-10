import { Request, Response, NextFunction } from "express";
import { TestsStudentService } from "../../services/TestsStudent.service";

export class TestsStudentController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    console.log("[TestsController] /getAll");

    const testsStudentService = new TestsStudentService();

    try {
      const tests = await testsStudentService.getAllByStudentId(req.params.id);
      res.json(tests);
    } catch (error: any) {
      console.log("[TestsController] /getAll" + error.message);
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    console.log("[TestsController] /getById");

    const testsStudentService = new TestsStudentService();

    try {
      const test = await testsStudentService.getByTestStudentId(req.params.id);
      res.json(test);
    } catch (error: any) {
      console.log("[TestsController] /getById" + error.message);
      next(error);
    }
  }
}
