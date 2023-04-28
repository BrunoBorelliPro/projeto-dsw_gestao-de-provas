import { prisma } from "../../prisma/client";
// Rodar o servidor antes de rodar os testes

async function resetDB(questionsId: string[]) {
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
}

describe("Questions", () => {
  let questionsId: string[] = [];
  beforeEach(async () => {
    await resetDB(questionsId);
    questionsId = [];
  });
  afterAll(async () => {
    await resetDB(questionsId);
    questionsId = [];
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
    question.alternatives.map((alternative: any) => {
      expect(alternative.question_id).toBe(question.id);
    });
    questionsId.push(question.id);
  });

  it("should return a list of questions", async () => {
    const question1 = await fetch("http://localhost:8080/questions", {
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
    }).then((res) => res.json());
    const question2 = await fetch("http://localhost:8080/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "What is the best database?",
        question_type: "essay",
        alternatives: [],
      }),
    }).then((res) => res.json());

    const res = await fetch("http://localhost:8080/questions");
    expect(res.status).toBe(200);

    const questions = await res.json();

    const filteredQuestions = questions.filter((question: any) => {
      return question.id === question1.id || question.id === question2.id;
    });

    expect(filteredQuestions.length).toBe(2);

    questionsId.push(filteredQuestions[0].id);
    questionsId.push(filteredQuestions[1].id);
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

    questionsId.push(findedQuestion.id);
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

    questionsId.push(updatedQuestion.id);
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
