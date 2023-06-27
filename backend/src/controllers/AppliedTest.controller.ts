import { Request, Response, NextFunction } from "express";
import { AppliedTestService } from "../services/AppliedTest.service";

export class AppliedTestController {
  async getAllMakedByStudent(req: Request, res: Response, next: NextFunction) {
    console.log("[TestsController] /getAllMakedByStudent");
    const appliedTestService = new AppliedTestService();
    try {
      const tests = await appliedTestService.getAllMakedByStudentId(
        req.body.student.id
      );
      res.json(tests);
    } catch (error: any) {
      console.log("[TestsController] /getAllMakedByStudent" + error.message);
      next(error);
    } finally {
      appliedTestService.close();
    }
  }
  async apply(req: Request, res: Response, next: NextFunction) {
    console.log("[TestsController] /apply");

    const appliedTestService = new AppliedTestService();

    const { students_id, test_id, available_until } = req.body;
    const teacher_id = req.body.teacher.id;

    try {
      const appliedTest = await appliedTestService.apply(
        students_id,
        test_id,
        new Date(available_until),
        teacher_id
      );
      res.status(201).json(appliedTest);
    } catch (error: any) {
    } finally {
      appliedTestService.close();
    }
  }
  async getAllAvailableTestsByStudent(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log("[TestsController] /getAll");
    console.log(req.params);

    const appliedTestService = new AppliedTestService();

    try {
      const tests = await appliedTestService.getAllAvailableTestsByStudentId(
        req.params.id
      );
      res.json(tests);
    } catch (error: any) {
      console.log("[TestsController] /getAll" + error.message);
      next(error);
    } finally {
      appliedTestService.close();
    }
  }

  async getAllByStudent(req: Request, res: Response, next: NextFunction) {
    console.log("[TestsController] /getAll");
    console.log(req.params);

    const appliedTestService = new AppliedTestService();

    try {
      const tests = await appliedTestService.getAllByStudentId(req.params.id);
      res.json(tests);
    } catch (error: any) {
      console.log("[TestsController] /getAll" + error.message);
      next(error);
    } finally {
      appliedTestService.close();
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    console.log("[TestsController] /getById");

    const appliedTestService = new AppliedTestService();

    try {
      const test = await appliedTestService.getById(req.params.id);
      if (!test) {
        return res.status(404).json({ message: "Test not found" });
      }
      res.status(200).json(test);
    } catch (error: any) {
      console.log("[TestsController] /getById" + error.message);
      next(error);
    } finally {
      appliedTestService.close();
    }
  }

  async getAllByTeacher(req: Request, res: Response, next: NextFunction) {
    console.log("[TestsController] /getAllByTeacher");
    const appliedTestService = new AppliedTestService();
    try {
      const tests = await appliedTestService.getAllByTeacherId(
        req.body.teacher.id
      );
      res.json(tests);
    } catch (error: any) {
      console.log("[TestsController] /getAllByTeacher" + error.message);
      next(error);
    } finally {
      appliedTestService.close();
    }
  }
  async getByAppliedTestId(req: Request, res: Response, next: NextFunction) {
    console.log("[TestsController] /getByAppliedTestId");
    const appliedTestService = new AppliedTestService();
    try {
      const test = await appliedTestService.getByAppliedTestId(req.params.id);
      res.json(test);
    } catch (error: any) {
      console.log("[TestsController] /getByAppliedTestId" + error.message);
      next(error);
    } finally {
      appliedTestService.close();
    }
  }
}
