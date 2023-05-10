import { Router } from "express";
import { TestsStudentController } from "../../controllers/aluno/TestsStudent.controller";

const testRouter = Router();
const testsStudentController = new TestsStudentController();
testRouter.get("/:id/", testsStudentController.getAll);
testRouter.get("/test/:id", testsStudentController.getById);
export { testRouter };
