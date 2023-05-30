describe("Auth", () => {
  it("should create a new user", async () => {
    const toCreateUser = {
      username: "test",
      email: "test@test.test",
      password: "test",
    };

    const res = await fetch("http://localhost:3331/users", {
      method: "POST",
      body: JSON.stringify(toCreateUser),
      headers: { "Content-Type": "application/json" },
    });

    expect(res.status).toBe(201);
  });

  it("should login with the created user", async () => {
    const toLoginUser = {
      username: "test",
      password: "test",
    };

    const res = await fetch("http://localhost:3331/login", {
      method: "POST",
      body: JSON.stringify(toLoginUser),
      headers: { "Content-Type": "application/json" },
    });

    expect(res.status).toBe(200);

    const token = res.headers.get("Authorization");

    expect(token).not.toBeNull();
  });

  it("shoud logout", async () => {
    const res = await fetch("http://localhost:3331/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    expect(res.status).toBe(200);

    const token = res.headers.get("Authorization");

    expect(token).toBe("Bearer");
  });
});
