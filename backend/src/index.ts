import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import { router } from "./api/router";
import cors from "cors";

config();
const app = express();
const port = process.env.PORT || 3000;
const HOST = process.env.HOST || "http://localhost";
const URL = `${HOST}:${port}/`;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  if (err.status === 404) return res.status(404).send("Sorry can't find that!");
  if (err.message.includes("Unique constraint failed on the constraint"))
    return res.status(409).send("Email already exists!");
  return res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`${URL}`);
});
