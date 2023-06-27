import { NextFunction, Request, Response } from "express";
import { ResponseTestService } from "../services/ResponseTest.service";

export default class ResponseTestController {
  async create(req: Request, res: Response, next: NextFunction) {
    const responseTestService = new ResponseTestService();

    try {
      console.log(
        `[ResponseTestController] create responseTest for ${req.params.testId}`
      );
      console.log(
        `[ResponseTestController] create responseTest for ${req.body.student.id}`
      );
      console.log(req.body);
      const responseTest = await responseTestService.create(
        req.params.testId,
        req.body.responses,
        req.body.student.id
      );
      res.status(201).json(responseTest);
    } catch (error) {
      next(error);
    } finally {
      responseTestService.close();
    }
  }
}
