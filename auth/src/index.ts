import app from "./app";
import dbo from "./db/conn";

import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3331;

dbo
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
