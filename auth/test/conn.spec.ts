import { collections, connectToDatabase } from "../src/database/conn";
import { User } from "../src/database/entities/User";

describe("MongoDB Connection", () => {
  it("should connect to MongoDB", async () => {
    const connection = await connectToDatabase();
    expect(() => {
      connection;
    }).not.toThrow();
  });
});
