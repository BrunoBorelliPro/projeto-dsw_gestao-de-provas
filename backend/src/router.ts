import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { QuestionController } from "./controllers/Question.controller";
import { QuestionService } from "./services/Question.service";

const router = Router();
const questionController = new QuestionController();
router.get("/questions", (req, res, next) =>
  questionController.getAll(req, res, next)
);
router.post("/questions", (req, res, next) =>
  questionController.create(req, res, next)
);

router.get("/questions/:id", (req, res, next) =>
  questionController.getById(req, res, next)
);
router.put("/questions/:id", (req, res, next) =>
  questionController.update(req, res, next)
);
router.delete("/questions/:id", (req, res, next) =>
  questionController.delete(req, res, next)
);

export { router };
