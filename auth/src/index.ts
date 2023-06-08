import app from "./app";
import dbo from "./db/conn";

import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3331;
const HOST = process.env.HOST || "http://localhost";
const URL = `${HOST}:${PORT}/`;

dbo
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${URL}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
