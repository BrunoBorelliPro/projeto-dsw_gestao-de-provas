import { Router } from "express";

import { TestController } from "../../controllers/Test.controller";
import isTeacherMiddleware from "../../middlewares/isTeacher.middleware";
const router = Router();

const testController = new TestController();

router.use(isTeacherMiddleware.isTeacherMiddleware);

router.get("/", (req, res, next) => testController.getAll(req, res, next));
router.post("/", (req, res, next) => testController.create(req, res, next));
router.get("/:id", (req, res, next) => testController.getById(req, res, next));
router.put("/:id", (req, res, next) => testController.update(req, res, next));
router.delete("/:id", (req, res, next) =>
  testController.delete(req, res, next)
);

export { router as testRouter };
