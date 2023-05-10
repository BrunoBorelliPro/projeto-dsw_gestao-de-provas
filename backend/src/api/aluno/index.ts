import { Router } from "express";
import { testRouter } from "./tests.router";
const alunoRouter = Router();

alunoRouter.use("/tests", testRouter);

export { alunoRouter };
