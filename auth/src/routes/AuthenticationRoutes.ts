import { Router } from "express";
import AuthenticationController from "../controllers/AuthenticationController";

const AuthenticationRoutes = Router();

AuthenticationRoutes.post("/login", AuthenticationController.login);

export default AuthenticationRoutes;
