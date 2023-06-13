import { Router } from "express";
import ResponseTestController from "../../controllers/ResponseTest.controller";

const responseTestRouter = Router();

const responseTestController = new ResponseTestController();

responseTestRouter.post("/:testId", responseTestController.create);
export { responseTestRouter };
