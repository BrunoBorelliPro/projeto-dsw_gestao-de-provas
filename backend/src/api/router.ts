import { Router } from "express";

import { resourcesRouter } from "./resources";
import { alunoRouter } from "./aluno";
const router = Router();
router.use(resourcesRouter);
router.use("/aluno", alunoRouter);

export { router };
