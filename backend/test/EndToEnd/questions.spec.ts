import { prisma } from "../../prisma/client";
// Rodar o servidor antes de rodar os testes
describe("Questions", () => {
  beforeAll(async () => {
    await prisma.alternative.deleteMany({});
    await prisma.question.deleteMany({});
  });
  afterEach(async () => {
    await prisma.alternative.deleteMany({});
    await prisma.question.deleteMany({});
  });
  it("should create a new question", async () => {
    const res = await fetch("http://localhost:8080/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "What is the best programming language?",
        question_type: "multiple_choice",
        alternatives: [
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
      }),
    });
    expect(res.status).toBe(201);
    const question = await res.json();
    expect(question.content).toBe("What is the best programming language?");
    expect(question.question_type).toBe("multiple_choice");
    expect(question.alternatives.length).toBe(3);
    expect(question.alternatives[0].content).toBe("C#");
    expect(question.alternatives[0].is_correct).toBe(false);
    expect(question.alternatives[1].content).toBe("Java");
    expect(question.alternatives[1].is_correct).toBe(false);
    expect(question.alternatives[2].content).toBe("Python");
    expect(question.alternatives[2].is_correct).toBe(true);
  });

  it("should return a list of questions", async () => {
    await fetch("http://localhost:8080/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "What is the best programming language?",
        question_type: "multiple_choice",
        alternatives: [
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
      }),
    });
    await fetch("http://localhost:8080/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "What is the best database?",
        question_type: "essay",
        alternatives: [],
      }),
    });

    const res = await fetch("http://localhost:8080/questions");
    expect(res.status).toBe(200);

    const questions = await res.json();

    expect(questions.length).toBe(2);
    expect(questions[0].content).toBe("What is the best programming language?");
    expect(questions[0].question_type).toBe("multiple_choice");
    expect(questions[0].alternatives.length).toBe(3);

    expect(questions[1].content).toBe("What is the best database?");
    expect(questions[1].question_type).toBe("essay");
    expect(questions[1].alternatives.length).toBe(0);
  });

  it("should return a question by id", async () => {
    const question = await fetch("http://localhost:8080/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "What is the best database?",
        question_type: "essay",
        alternatives: [],
      }),
    });

    const questionJson = await question.json();

    const res = await fetch(
      `http://localhost:8080/questions/${questionJson.id}`
    );
    expect(res.status).toBe(200);

    const findedQuestion = await res.json();
    expect(findedQuestion.id).toBe(questionJson.id);

    expect(findedQuestion.content).toBe("What is the best database?");
    expect(findedQuestion.question_type).toBe("essay");
    expect(findedQuestion.alternatives.length).toBe(0);
  });

  it("should update a question", async () => {
    const question = await fetch("http://localhost:8080/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "What is the best database?",
        question_type: "essay",
        alternatives: [],
      }),
    });

    const questionJson = await question.json();

    const res = await fetch(
      `http://localhost:8080/questions/${questionJson.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: "What is the best database?",
          question_type: "multiple_choice",
          alternatives: [
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
        }),
      }
    );

    expect(res.status).toBe(200);

    const updatedQuestion = await res.json();

    expect(updatedQuestion.id).toBe(questionJson.id);
    expect(updatedQuestion.content).toBe("What is the best database?");
    expect(updatedQuestion.question_type).toBe("multiple_choice");

    expect(updatedQuestion.alternatives.length).toBe(3);
  });

  it("should delete a question", async () => {
    const question = await fetch("http://localhost:8080/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "What is the best database?",
        question_type: "essay",
        alternatives: [],
      }),
    });

    const questionJson = await question.json();

    expect(questionJson.id).toBeDefined();

    await fetch(`http://localhost:8080/questions/${questionJson.id}`, {
      method: "DELETE",
    });

    const res = await fetch(
      `http://localhost:8080/questions/${questionJson.id}`
    );
    expect(res.status).toBe(404);
  });
});
