import { Router } from "express";
import { QuestionController } from "../../controllers/Question.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import isTeacherMiddleware from "../../middlewares/isTeacher.middleware";

const router = Router();
const questionController = new QuestionController();

router.use(isTeacherMiddleware.isTeacherMiddleware);

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
