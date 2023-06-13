import { Router } from "express";
import { AppliedTestController } from "../../controllers/AppliedTest.controller";
import isStudentMiddleware from "../../middlewares/isStudent.middleware";
import isTeacherMiddleware from "../../middlewares/isTeacher.middleware";

const appliedTestsRouter = Router();
const appliedTestController = new AppliedTestController();

appliedTestsRouter.get(
  "/students/:id",
  isStudentMiddleware.isStudentMiddleware,
  appliedTestController.getAllByStudent
); //lista todos os testes aplicados a um aluno
appliedTestsRouter.get(
  "/:id",
  isStudentMiddleware.isStudentMiddleware,
  appliedTestController.getById
); // retorna um teste aplicado pelo id
appliedTestsRouter.post(
  "/",
  isTeacherMiddleware.isTeacherMiddleware,
  appliedTestController.apply
); // aplica um teste a vários alunos
export { appliedTestsRouter };
