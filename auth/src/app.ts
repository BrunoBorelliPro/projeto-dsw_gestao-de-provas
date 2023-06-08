import express from "express";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes";
import AuthenticationRoutes from "./routes/AuthenticationRoutes";
const app = express();
import dotenv from "dotenv";
dotenv.config();

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || "*";

console.log("ALLOWED_ORIGINS", ALLOWED_ORIGINS);

const allowedOrigins = ALLOWED_ORIGINS.replace(" ", "")
  .replace("[", "")
  .replace("]", "")
  .replace(/'/g, "")
  .replace(/"/g, "")
  .split(",");

console.log("allowedOrigins", allowedOrigins);

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization, Origin, X-Auth-Token",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(UserRoutes);
app.use(AuthenticationRoutes);

export default app;
