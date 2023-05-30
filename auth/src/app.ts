import express from "express";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes";
import AuthenticationRoutes from "./routes/AuthenticationRoutes";
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization, Origin, X-Auth-Token",
  })
);
app.use(express.json());

app.use(UserRoutes);
app.use(AuthenticationRoutes);

export default app;
