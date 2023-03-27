import { NextFunction, Request, Response } from "express";
import { QuestionService } from "../services/Question.service";

export class QuestionController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    console.log("[QuestionController] /getAll");

    try {
      const questionService = new QuestionService();
      const questions = await questionService.getAll();
      return res.json(questions);
    } catch (error: any) {
      console.log("[QuestionController] /getAll" + error.message);
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    console.log("[QuestionController] /getById");

    try {
      const { id } = req.params;
      const questionService = new QuestionService();

      const question = await questionService.getById(id);

      if (!question) {
        res.status(404).json({ message: "Question not found" });
      } else {
        res.json(question);
      }
    } catch (error: any) {
      console.log("[QuestionController] /getById" + error.message);
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    console.log("[QuestionController] /create");

    try {
      const question = req.body;
      console.log(question);
      const questionService = new QuestionService();
      const createdQuestion = await questionService.create(question);

      res.status(201);
      res.json(createdQuestion);
    } catch (error: any) {
      console.log("[QuestionController] /create" + error.message);
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    console.log("[QuestionController] /update");

    try {
      const { id } = req.params;
      const question = req.body;
      const questionService = new QuestionService();
      const updatedQuestion = await questionService.update(id, question);
      return res.json(updatedQuestion);
    } catch (error: any) {
      if (error.message === "Question not found") {
        return res.status(404).json({ message: "Question not found" });
      } else {
        console.log("[QuestionController] /update" + error.message);
        next(error);
      }
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    console.log(`[QuestionController] /delete`);

    try {
      const { id } = req.params;

      console.log(`[QuestionController] /delete/${id}`);

      const questionService = new QuestionService();

      const deletedQuestionId = await questionService.delete(id);
      return res.json({ deleted: deletedQuestionId });
    } catch (error: any) {
      console.log("[QuestionController] /delete" + error.message);
      next(error);
    }
  }
}
