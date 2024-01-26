import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config();
const prisma = new PrismaClient();

const authURL = process.env.AUTH_URL || "http://localhost:3001";

async function main() {
  try {
    // if (true) {
    //   console.log(authURL + "/users");
    //   throw new Error("Seed is disabled");
    // }
    console.log("Starting seed...");
    await prisma.$connect();
    console.log("Connected to database!");
    console.log("Creating users...");
    console.log("Creating teacher...");
    const teacher = await prisma.teacher.create({
      data: {
        name: "Professor",
        email: "p@p.com",
      },
    });
    console.log("Creating auth teacher...");
    const authTeacher = await fetch(authURL + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: teacher.name,
        email: teacher.email,
        password: "p",
        user_id: teacher.id,
        isTeacher: true,
      }),
    });

    console.log("Creating students...");

    const student1 = await prisma.student.create({
      data: {
        name: "Aluno 1",
        email: "a1@a.com",
      },
    });
    const student2 = await prisma.student.create({
      data: {
        name: "Aluno 2",
        email: "a2@a.com",
      },
    });

    console.log("Creating auth students...");

    const authStudent1 = await fetch(authURL + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: student1.name,
        email: student1.email,
        password: "a",
        user_id: student1.id,
        isTeacher: false,
      }),
    });
    const authStudent2 = await fetch(authURL + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: student2.name,
        email: student2.email,
        password: "a",
        user_id: student2.id,
        isTeacher: false,
      }),
    });

    console.log("Creating questions...");
    const question1 = await prisma.question.create({
      data: {
        content:
          "Qual a linguagem de programação usada no backend desse projeto?",
        question_type: "multiple_choice",
        alternatives: {
          createMany: {
            data: [
              {
                content: "TypeScript",
                is_correct: true,
              },
              {
                content: "JavaScript",
                is_correct: false,
              },
              {
                content: "Java",
                is_correct: false,
              },
              {
                content: "Cobol",
                is_correct: false,
              },
            ],
          },
        },
      },
    });
    const question2 = await prisma.question.create({
      data: {
        content: "Quais são linguagens de programação?",
        question_type: "true_false",
        alternatives: {
          createMany: {
            data: [
              {
                content: "Python",
                is_correct: true,
              },
              {
                content: "C++",
                is_correct: true,
              },
              {
                content: "Mysql",
                is_correct: false,
              },
              {
                content: "MongoDB",
                is_correct: false,
              },
            ],
          },
        },
      },
    });
    const question3 = await prisma.question.create({
      data: {
        content: "Quanto é 2 + 2?",
        question_type: "essay",
        response: "4",
      },
    });

    console.log("Creating tests...");
    const test1 = await prisma.test.create({
      data: {
        title: "Teste 1",
        questions: {
          connect: [
            {
              id: question1.id,
            },
            {
              id: question2.id,
            },
            {
              id: question3.id,
            },
          ],
        },
        teacher: {
          connect: {
            id: teacher.id,
          },
        },
      },
    });

    const test2 = await prisma.test.create({
      data: {
        title: "Teste 2",
        questions: {
          connect: [
            {
              id: question1.id,
            },
          ],
        },
        teacher: {
          connect: {
            id: teacher.id,
          },
        },
      },
    });
  } catch (error) {
    console.log("Error on seed");
    console.log(error);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
