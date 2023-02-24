import { collections, connectToDatabase } from "../src/database/conn";
import { User } from "../src/database/entities/User";

describe("MongoDB Connection", () => {
  it("should connect to MongoDB", async () => {
    const connection = await connectToDatabase();
    expect(() => {
      connection;
    }).not.toThrow();
  });
  it("should post a new user", async () => {
    await connectToDatabase();
    const user = new User(
      "test",
      "test@test.com",
      "test!password",
      new Date(),
      new Date()
    );
    const result = await collections.auth.insertOne(user);
    console.log(result);
    expect(result).not.toBeNull();
  });
  it("should get a user", async () => {
    await connectToDatabase();
    const result = (await collections.auth.findOne({
      name: "test",
    })) as User;

    console.log(result);
    expect(result).not.toBeNull();
  });
});
