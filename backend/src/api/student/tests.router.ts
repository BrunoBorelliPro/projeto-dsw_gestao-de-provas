import { Router } from "express";
import { AppliedTestController } from "../../controllers/student/AppliedTest.controller";

const testRouter = Router();
const appliedTestController = new AppliedTestController();
testRouter.get("/student/:id", appliedTestController.getAllByStudent); //lista todos os testes aplicados a um aluno
testRouter.get("/:id", appliedTestController.getById); // retorna um teste aplicado pelo id
testRouter.post("/", appliedTestController.apply); // aplica um teste a vários alunos
export { testRouter };
