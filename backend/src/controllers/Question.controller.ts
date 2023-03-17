import { Request, Response } from "express";
import { QuestionService } from "../services/Question.service";

export class QuestionController {
  async getAll(req: Request, res: Response) {
    console.log("[QuestionController] /getAll");

    const questionService = new QuestionService();
    const questions = await questionService.getAll();
    return res.json(questions);
  }

  async getById(req: Request, res: Response) {
    console.log("[QuestionController] /getById");

    const { id } = req.params;
    const questionService = new QuestionService();

    const question = await questionService.getById(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.json(question);
  }
  async create(req: Request, res: Response) {
    console.log("[QuestionController] /create");

    const question = req.body;
    console.log(question);
    const questionService = new QuestionService();
    const createdQuestion = await questionService.create(question);

    res.status(201);
    res.json(createdQuestion);
  }

  async update(req: Request, res: Response) {
    console.log("[QuestionController] /update");

    const { id } = req.params;
    const question = req.body;
    const questionService = new QuestionService();
    try {
      const updatedQuestion = await questionService.update(id, question);
      return res.json(updatedQuestion);
    } catch (error: any) {
      if (error.message === "Question not found") {
        return res.status(404).json({ message: "Question not found" });
      }
      throw error;
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    console.log(`[QuestionController] /delete/${id}`);

    const questionService = new QuestionService();

    const deletedQuestionId = await questionService.delete(id);
    return res.json({ deleted: deletedQuestionId });
  }
}
