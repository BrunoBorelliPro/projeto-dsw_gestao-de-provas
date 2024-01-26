import { Router } from "express";

import { questionRouter } from "./questions.router";
import { testRouter } from "./tests.router";
import { teacherRouter } from "./teacher.router";
import { studentRouter } from "./student.router";
import { appliedTestsRouter } from "./appliedTests.router";
import authMiddleware from "../../middlewares/auth.middleware";
import { UserController } from "../../controllers/User.controller";
import { responseTestRouter } from "./responseTest.router";
const router = Router();

const userController = new UserController();

router.use("/teachers", teacherRouter);
router.use("/students", studentRouter);

router.use(authMiddleware.authMiddleware);

router.get("/users", userController.get);
router.use("/questions", questionRouter);
router.use("/tests", testRouter);
router.use("/appliedTests", appliedTestsRouter);
router.use("/responseTest", responseTestRouter);

export { router as resourcesRouter };
