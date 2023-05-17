import { Router } from "express";

import { resourcesRouter } from "./resources";
import { alunoRouter } from "./student";
const router = Router();
router.use(resourcesRouter);
router.use("/student", alunoRouter);

export { router };
