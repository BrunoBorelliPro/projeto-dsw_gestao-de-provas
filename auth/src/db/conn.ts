import { Db, MongoClient, MongoClientOptions } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const client = new MongoClient(MONGO_URL);
let dbConnection: Db;

export default {
  connect: async () => {
    if (dbConnection) {
      return dbConnection;
    }
    try {
      await client.connect();
      dbConnection = client.db("auth");
      return dbConnection;
    } catch (err) {
      console.error(err);
    }
  },

  getDb: () => {
    if (!dbConnection) {
      throw new Error("Call connect first!");
    }
    return dbConnection;
  },
};
