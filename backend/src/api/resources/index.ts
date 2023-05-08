import { Router } from "express";

import { questionRouter } from "./questions.router";
import { testRouter } from "./tests.router";
const router = Router();
router.use("/questions", questionRouter);
router.use("/tests", testRouter);

export { router as resourcesRouter };
