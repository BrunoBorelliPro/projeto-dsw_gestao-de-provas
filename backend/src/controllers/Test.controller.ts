import { NextFunction, Request, Response } from "express";
import { TestService } from "../services/Test.service";
import { Test } from "../entities/Test/Test";

export class TestController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    console.log("[TestController] /getAll");
    const testService = new TestService();

    try {
      const tests = await testService.getAll();
      return res.json(tests);
    } catch (error: any) {
      console.log("[TestController] /getAll " + error.message);
      next(error);
    } finally {
      testService.close();
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    console.log("[TestController] /getById ");
    const testService = new TestService();

    try {
      const test = await testService.getById(req.params.id);

      if (!test) {
        return res.status(404).json({ message: "Test not found" });
      }

      return res.json(test);
    } catch (error: any) {
      console.log("[TestController] /getById " + error.message);
      next(error);
    } finally {
      testService.close();
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    console.log("[TestController] /create");
    const testService = new TestService();

    try {
      const toCreateTest = new Test(
        req.body.title,
        req.body.teacher.id,
        req.body.questions
      );

      const test = await testService.create(toCreateTest);
      return res.status(201).json(test);
    } catch (error: any) {
      console.log("[TestController] /create " + error.message);

      if (error.message === "Number of questions must be greater than 0") {
        console.log("[TestController] /create " + error.message);
        return res.status(400).json({ message: error.message });
      }
      if (error.message === "Title is required") {
        console.log("[TestController] /create " + error.message);
        return res.status(400).json({ message: error.message });
      }

      if (error.message === "Teacher is required") {
        console.log("[TestController] /create " + error.message);
        return res.status(400).json({ message: error.message });
      }

      if (error.message === "Test not found") {
        console.log("[TestController] /create " + error.message);
        return res.status(404).json({ message: error.message });
      }

      next(error);
    } finally {
      testService.close();
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    console.log("[TestController] /update");
    const testService = new TestService();

    try {
      const toUpdateTest = new Test(
        req.body.title,
        req.body.teacher.id,
        req.body.questions
      );
      const test = await testService.update(req.params.id, toUpdateTest);
      return res.json(test);
    } catch (error: any) {
      console.log("[TestController] /update " + error.message);
      if (error.message === "Number of questions must be greater than 0") {
        console.log("[TestController] /update " + error.message);
        return res.status(400).json({ message: error.message });
      }
      if (error.message === "Title is required") {
        console.log("[TestController] /update " + error.message);
        return res.status(400).json({ message: error.message });
      }

      if (error.message === "Teacher is required") {
        console.log("[TestController] /update " + error.message);
        return res.status(400).json({ message: error.message });
      }

      if (error.message === "Test not found") {
        console.log("[TestController] /update " + error.message);
        return res.status(404).json({ message: error.message });
      }
      next(error);
    } finally {
      testService.close();
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    console.log("[TestController] /delete");
    const testService = new TestService();

    try {
      const test = await testService.delete(req.params.id);
      return res.json(test);
    } catch (error: any) {
      console.log("[TestController] /delete " + error.message);
      next(error);
    } finally {
      testService.close();
    }
  }
}
