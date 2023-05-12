import { Router } from "express";
import { testRouter } from "./tests.router";
import { studentRouter } from "./student.router";
const alunoRouter = Router();

alunoRouter.use("/", studentRouter);
alunoRouter.use("/tests", testRouter);

export { alunoRouter };
