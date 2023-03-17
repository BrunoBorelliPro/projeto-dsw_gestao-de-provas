import express from "express";
import { config } from "dotenv";
import { router } from "./router";
import cors from "cors";

config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
