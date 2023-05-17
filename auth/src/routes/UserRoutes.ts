import { Router } from "express";
import UserController from "../controllers/UserController";
import AuthenticationMiddleware from "../middlewares/AuthenticationMiddleware";

const UserRoutes = Router();

UserRoutes.post("/users", UserController.create);
UserRoutes.get(
  "/users/:id",
  AuthenticationMiddleware.verifyJWT,
  UserController.get
);
UserRoutes.put(
  "/users/:id",
  AuthenticationMiddleware.verifyJWT,
  UserController.update
);
UserRoutes.delete(
  "/users/:id",
  AuthenticationMiddleware.verifyJWT,
  UserController.delete
);

export default UserRoutes;
