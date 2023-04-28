import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { QuestionController } from "./controllers/Question.controller";
import { QuestionService } from "./services/Question.service";
import { TestController } from "./controllers/Test.controller";

const router = Router();
const questionController = new QuestionController();
const testController = new TestController();

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

router.get("/tests", (req, res, next) => testController.getAll(req, res, next));
router.post("/tests", (req, res, next) =>
  testController.create(req, res, next)
);
router.get("/tests/:id", (req, res, next) =>
  testController.getById(req, res, next)
);
router.put("/tests/:id", (req, res, next) =>
  testController.update(req, res, next)
);
router.delete("/tests/:id", (req, res, next) =>
  testController.delete(req, res, next)
);

export { router };
