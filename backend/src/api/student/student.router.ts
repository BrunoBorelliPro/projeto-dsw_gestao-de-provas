import { Router } from "express";
import { StudentController } from "../../controllers/student/Student.controller";

const studentRouter = Router();
const studentController = new StudentController();
studentRouter.get("/", studentController.getAll);
studentRouter.get("/:id", studentController.getById);
studentRouter.post("/", studentController.create);
studentRouter.put("/:id", studentController.update);
studentRouter.delete("/:id", studentController.delete);

export { studentRouter };
