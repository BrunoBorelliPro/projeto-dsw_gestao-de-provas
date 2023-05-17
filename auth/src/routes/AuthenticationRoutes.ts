import { Router } from "express";
import AuthenticationController from "../controllers/AuthenticationController";

const AuthenticationRoutes = Router();

AuthenticationRoutes.post("/login", AuthenticationController.login);
AuthenticationRoutes.post("/logout", AuthenticationController.logout);

export default AuthenticationRoutes;
