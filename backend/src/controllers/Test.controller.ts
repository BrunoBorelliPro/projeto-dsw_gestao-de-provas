import { NextFunction, Request, Response } from "express";
import { TestService } from "../services/Test.service";

export class TestController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    console.log("[TestController] /getAll");

    try {
      const testService = new TestService();
      const tests = await testService.getAll();
      return res.json(tests);
    } catch (error: any) {
      console.log("[TestController] /getAll " + error.message);
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    console.log("[TestController] /getById ");

    try {
      const testService = new TestService();
      const test = await testService.getById(req.params.id);

      if (!test) {
        return res.status(404).json({ message: "Test not found" });
      }

      return res.json(test);
    } catch (error: any) {
      console.log("[TestController] /getById " + error.message);
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    console.log("[TestController] /create");
    console.log(req.body);
    try {
      const testService = new TestService();
      const test = await testService.create(req.body);
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
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    console.log("[TestController] /update");

    try {
      const testService = new TestService();
      const test = await testService.update(req.params.id, req.body);
      return res.json(test);
    } catch (error: any) {
      console.log("[TestController] /update " + error.message);
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    console.log("[TestController] /delete");

    try {
      const testService = new TestService();
      const test = await testService.delete(req.params.id);
      return res.json(test);
    } catch (error: any) {
      console.log("[TestController] /delete " + error.message);
      next(error);
    }
  }
}
