import { Router } from "express";
import { StudentController } from "../../controllers/Student.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router();
const studentController = new StudentController();
router.post("/", studentController.create);

router.use(authMiddleware.authMiddleware);
router.get("/", studentController.getAll);
router.get("/:id", studentController.getById);
router.put("/:id", studentController.update);
router.delete("/:id", studentController.delete);

export { router as studentRouter };
