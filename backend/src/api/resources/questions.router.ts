import { Router } from "express";
import { QuestionController } from "../../controllers/Question.controller";

const router = Router();
const questionController = new QuestionController();

router.get("/", (req, res, next) => questionController.getAll(req, res, next));
router.post("/", (req, res, next) => questionController.create(req, res, next));

router.get("/:id", (req, res, next) =>
  questionController.getById(req, res, next)
);
router.put("/:id", (req, res, next) =>
  questionController.update(req, res, next)
);
router.delete("/:id", (req, res, next) =>
  questionController.delete(req, res, next)
);

export { router as questionRouter };
