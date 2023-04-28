import { prisma } from "../../prisma/client";
// Rodar o servidor antes de rodar os testes
async function resetDB(questionsId: string[], teacherId: string) {
  questionsId.map(async (id) => {
    await prisma.alternative.deleteMany({
      where: {
        question_id: id,
      },
    });
    await prisma.question.deleteMany({
      where: {
        id: id,
      },
    });
  });

  await prisma.test.deleteMany({
    where: {
      teacher_id: teacherId,
    },
  });
  await prisma.teacher.deleteMany({
    where: {
      id: teacherId,
    },
  });
}
async function seedDB() {
  const question1 = await prisma.question.create({
    data: {
      content: "What is the best programming language?",
      question_type: "multiple_choice",
      alternatives: {
        create: [
          {
            content: "C#",
            is_correct: false,
          },
          {
            content: "Java",
            is_correct: false,
          },
          {
            content: "Python",
            is_correct: true,
          },
        ],
      },
    },
  });
  const question2 = await prisma.question.create({
    data: {
      content: "What is the best database?",
      question_type: "multiple_choice",
      alternatives: {
        create: [
          {
            content: "Postgres",
            is_correct: false,
          },
          {
            content: "MongoDB",
            is_correct: false,
          },
          {
            content: "MySQL",
            is_correct: true,
          },
        ],
      },
    },
  });

  const teacher = await prisma.teacher.create({
    data: {
      name: "Luizão",
    },
  });

  return { question1, question2, teacher };
}
describe("Tests", () => {
  let teacherId: string;
  let questionsId: string[] = [];
  beforeAll(async () => {
    await resetDB(questionsId, teacherId);
    const { question1, question2, teacher } = await seedDB();

    teacherId = teacher.id;
    questionsId.push(question1.id);
    questionsId.push(question2.id);
  });
  afterAll(async () => {
    await resetDB(questionsId, teacherId);
  });

  it("should create a new test", async () => {
    const res = await fetch("http://localhost:8080/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Teste de programação",
        teacherId: teacherId,
        questions: questionsId,
      }),
    });
    expect(res.status).toBe(201);
    const test = await res.json();

    expect(test.title).toBe("Teste de programação");
    expect(test.questions.length).toBe(2);
  });

  it("should get all tests", async () => {
    const res = await fetch("http://localhost:8080/tests");
    expect(res.status).toBe(200);
    const tests = await res.json();
    const filteredTests = tests.filter(
      (test: any) => test.teacher_id === teacherId
    );

    expect(filteredTests.length).toBe(1);
  });

  it("should throw an error when creating a test with zero questions", async () => {
    const res = await fetch("http://localhost:8080/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Teste de programação",
        teacherId: teacherId,
        questions: [],
      }),
    });
    expect(res.status).toBe(400);
    const error = await res.json();

    expect(error.message).toBe("Number of questions must be greater than 0");
  });

  it("should get a test by id", async () => {
    const test = await fetch("http://localhost:8080/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Teste de programação",
        teacherId: teacherId,
        questions: questionsId,
      }),
    }).then((res) => res.json());

    const res = await fetch(`http://localhost:8080/tests/${test.id}`);

    expect(res.status).toBe(200);

    const findedTest = await res.json();

    expect(findedTest.id).toBe(test.id);
    expect(findedTest.title).toBe("Teste de programação");
    expect(findedTest.questions.length).toBe(2);
  });

  it("should update a test", async () => {
    // create a test
    const createdTest = await fetch("http://localhost:8080/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Teste de programação",
        teacherId: teacherId,
        questions: questionsId,
      }),
    }).then((res) => res.json());

    // update the test
    const res = await fetch(`http://localhost:8080/tests/${createdTest.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Teste de programação 2",
        teacherId: teacherId,
        questions: questionsId,
      }),
    });

    expect(res.status).toBe(200);

    const updatedTest = await res.json();

    expect(updatedTest.id).toBe(createdTest.id);
    expect(updatedTest.title).toBe("Teste de programação 2");
    expect(updatedTest.questions.length).toBe(2);
  });

  it("should delete a test", async () => {
    // create a test
    const createdTest = await fetch("http://localhost:8080/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Teste de programação",
        teacherId: teacherId,
        questions: questionsId,
      }),
    }).then((res) => res.json());

    // delete the test
    const res = await fetch(`http://localhost:8080/tests/${createdTest.id}`, {
      method: "DELETE",
    });

    expect(res.status).toBe(200);

    const findedTest = await fetch(
      `http://localhost:8080/tests/${createdTest.id}`
    );

    expect(findedTest.status).toBe(404);
  });
});
