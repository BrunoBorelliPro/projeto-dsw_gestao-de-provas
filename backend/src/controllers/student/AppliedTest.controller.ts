import { Request, Response, NextFunction } from "express";
import { AppliedTestService } from "../../services/AppliedTest.service";

export class AppliedTestController {
  apply(req: Request, res: Response, next: NextFunction) {
    console.log("[TestsController] /apply");

    const appliedTestService = new AppliedTestService();

    const { students_id, test_id, available_until } = req.body;

    try {
      const appliedTest = appliedTestService.apply(
        students_id,
        test_id,
        new Date(available_until)
      );
      res.status(201).json(appliedTest);
    } catch (error: any) {}
  }
  async getAllByStudent(req: Request, res: Response, next: NextFunction) {
    // /api/student/:id/tests
    console.log("[TestsController] /getAll");
    console.log(req.params);

    const appliedTestService = new AppliedTestService();

    try {
      const tests = await appliedTestService.getAllByStudentId(req.params.id);
      res.json(tests);
    } catch (error: any) {
      console.log("[TestsController] /getAll" + error.message);
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    console.log("[TestsController] /getById");

    const appliedTestService = new AppliedTestService();

    try {
      const test = await appliedTestService.getByAppliedTestId(req.params.id);
      if (!test) {
        return res.status(404).json({ message: "Test not found" });
      }
      res.status(200).json(test);
    } catch (error: any) {
      console.log("[TestsController] /getById" + error.message);
      next(error);
    }
  }
}
