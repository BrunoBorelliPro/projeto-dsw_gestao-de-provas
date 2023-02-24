import express from "express";
import { authRouter } from "../src/http/routes";
import { Server } from "../src/http/server";
import { RegisterInput, RegisterOutput } from "../src/types/Register";

describe("Server", () => {
  let server: Server;

  it("should register a new user", async () => {
    const newUser: RegisterInput = {
      name: "test",
      email: "test@test.com",
      password: "test",
    };
    const result = await fetch("http://localhost:3000/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userJson = (await result.json()) as RegisterOutput;

    const expectedUser: RegisterOutput = {
      name: "test",
      email: "test@test.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log(userJson);
    expect(result.status).toBe(200);
    expect(userJson).not.toBeNull();
    expect(userJson._id).toBeDefined();
    expect(userJson.name).toBe(expectedUser.name);
    expect(userJson.email).toBe(expectedUser.email);
    expect(userJson.createdAt).toBeDefined();
    expect(userJson.updatedAt).toBeDefined();

    const url = `http://localhost:3000/delete/${userJson._id}`;
    const deleteResult = await fetch(url, {
      method: "DELETE",
    });
  });
  it("should delete a user", async () => {
    const newUser: RegisterInput = {
      name: "test1",
      email: "test1@test.com",
      password: "test1",
    };
    const result = await fetch("http://localhost:3000/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userJson = (await result.json()) as RegisterOutput;
    const url = `http://localhost:3000/delete/${userJson._id}`;
    const deleteResult = await fetch(url, {
      method: "DELETE",
    });
    const deleteJson = await deleteResult.json();

    expect(deleteResult.status).toBe(200);
    expect(deleteJson.message).toBe("User deleted");
  });
});
