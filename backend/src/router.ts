import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { QuestionController } from "./controllers/Question.controller";
import { QuestionService } from "./services/Question.service";

const router = Router();
const questionController = new QuestionController();
router.get("/questions", (req, res) => questionController.getAll(req, res));
router.post("/questions", (req, res) => questionController.create(req, res));

router.get("/questions/:id", (req, res) =>
  questionController.getById(req, res)
);
router.put("/questions/:id", (req, res) => questionController.update(req, res));
router.delete("/questions/:id", (req, res) =>
  questionController.delete(req, res)
);

export { router };
