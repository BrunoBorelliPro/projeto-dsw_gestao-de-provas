type UserTeacher = {
  name: string;
  email: string;
  password: string;
  isTeacher: boolean;
};
async function registerTeacher(userTeacher: UserTeacher) {
  console.log("[Register Teacher]");
  const apiPort = 8080;
  const authPort = 3331;

  const apiTeacher = await fetch(`http://localhost:${apiPort}/api/teachers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userTeacher.name,
      email: userTeacher.email,
    }),
  });

  const teacher = await apiTeacher.json();

  await fetch(`http://localhost:${authPort}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userTeacher.name,
      email: userTeacher.email,
      password: userTeacher.password,
      isTeacher: userTeacher.isTeacher,
      user_id: teacher.id,
    }),
  });
}

async function login(userTeacher: UserTeacher) {
  console.log("[Login]");
  const authPort = 3331;
  const authTeacherRes = await fetch(`http://localhost:${authPort}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userTeacher.email,
      password: userTeacher.password,
    }),
  });

  if (authTeacherRes.status != 200) {
    throw new Error("Invalid credentials");
  }

  const authTeacher = await authTeacherRes.json();

  const token = authTeacher.token;

  return { authTeacher, token };
}

export default {
  BASE_URL: "http://localhost:8080/api",

  async getToken() {
    const userTeacher = {
      name: "Test User",
      email: "test@test.com",
      password: "123456",
      isTeacher: true,
    };
    try {
      return await login(userTeacher);
    } catch (err: any) {
      if (err.message === "Invalid credentials") {
        await registerTeacher(userTeacher);
      }
      return await login(userTeacher);
    }
  },
};
