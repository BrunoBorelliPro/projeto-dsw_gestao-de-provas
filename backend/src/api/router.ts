import { Router } from "express";

import { resourcesRouter } from "./resources";
const router = Router();
router.use(resourcesRouter);

export { router };
