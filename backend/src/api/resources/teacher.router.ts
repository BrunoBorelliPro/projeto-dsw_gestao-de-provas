import { Router } from "express";
import { TeacherController } from "../../controllers/Teacher.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router();
const teacherController = new TeacherController();

router.post("/", teacherController.create);

router.use(authMiddleware.authMiddleware);
router.get("/", teacherController.getAll);
router.get("/:id", teacherController.getById);
router.put("/:id", teacherController.update);
router.delete("/:id", teacherController.delete);

export { router as teacherRouter };
