import express from "express";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes";
import AuthenticationRoutes from "./routes/AuthenticationRoutes";
const app = express();

app.use(cors());
app.use(express.json());

app.use(UserRoutes);
app.use(AuthenticationRoutes);

export default app;
