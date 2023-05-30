import utils from "../utils";
import { prisma } from "../../prisma/client";

function resetDb(questionsIs: string[]) {
  questionsIs.map(async (id) => {
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

describe("Questions Endpoint", () => {
  let teacher: any;
  let token: string;
  let questionsIds: string[] = [];

  beforeAll(async () => {
    const auth = await utils.getToken();
    console.log("auth");
    console.log(auth);

    teacher = auth.authTeacher;
    token = auth.token;
    return;
  });
  afterAll(async () => {
    console.log("[Delete Questions]");
    await resetDb(questionsIds);
  });

  it("should create a question", async () => {
    console.log("[Create Question]");
    const toCreateQuestion = {
      content: "What is the capital of Nigeria?",
      question_type: "multiple_choice",
      alternatives: [
        {
          content: "Abuja",
          is_correct: true,
        },
        {
          content: "Lagos",
          is_correct: false,
        },
        {
          content: "Kano",
          is_correct: false,
        },
      ],
    };
    const res = await fetch(`${utils.BASE_URL}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(toCreateQuestion),
    });
    const question = await res.json();

    expect(res.status).toBe(201);
    expect(question.id).toBeDefined();
    expect(question.content).toBe(toCreateQuestion.content);
    expect(question.question_type).toBe(toCreateQuestion.question_type);
    expect(question.alternatives).toHaveLength(3);

    questionsIds.push(question.id);
  });

  it("should get all questions", async () => {
    console.log("[Get All Questions]");
    const res = await fetch(`${utils.BASE_URL}/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const questions = await res.json();

    expect(res.status).toBe(200);
    expect(questions.length).toBeGreaterThanOrEqual(1);
  });

  it("should get a question by id", async () => {
    console.log("[Get Question By Id]");
    const toCreateQuestion = {
      content: "What is the capital of Nigeria?",
      question_type: "multiple_choice",
      alternatives: [
        {
          content: "Abuja",
          is_correct: true,
        },
        {
          content: "Lagos",
          is_correct: false,
        },
        {
          content: "Kano",
          is_correct: false,
        },
      ],
    };
    const resCreate = await fetch(`${utils.BASE_URL}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(toCreateQuestion),
    });
    const createdQuestion = await resCreate.json();

    const res = await fetch(
      `${utils.BASE_URL}/questions/${createdQuestion.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    const question = await res.json();

    expect(res.status).toBe(200);
    expect(question.id).toBe(createdQuestion.id);

    questionsIds.push(question.id);
  });

  it("should update a question", async () => {
    console.log("[Update Question]");
    const res = await fetch(`${utils.BASE_URL}/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const questions = await res.json();

    expect(res.status).toBe(200);
    expect(questions.length).toBeGreaterThanOrEqual(1);
  });

  it("should get a question by id", async () => {
    console.log("[Get Question By Id]");
    const toCreateQuestion = {
      content: "What is the capital of Nigeria?",
      question_type: "multiple_choice",
      alternatives: [
        {
          content: "Abuja",
          is_correct: true,
        },
        {
          content: "Lagos",
          is_correct: false,
        },
        {
          content: "Kano",
          is_correct: false,
        },
      ],
    };
    const resCreate = await fetch(`${utils.BASE_URL}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(toCreateQuestion),
    });
    const createdQuestion = await resCreate.json();

    const res = await fetch(
      `${utils.BASE_URL}/questions/${createdQuestion.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: "What is the capital of Nigeria?",
          question_type: "multiple_choice",
          alternatives: [
            {
              content: "Abuja",
              is_correct: true,
            },
            {
              content: "Lagos",
              is_correct: false,
            },
          ],
        }),
      }
    );
    const question = await res.json();

    expect(res.status).toBe(200);
    expect(question.id).toBe(createdQuestion.id);
    expect(question.alternatives).toHaveLength(2);

    questionsIds.push(question.id);
  });

  it("should delete a question", async () => {
    console.log("[Delete Question]");
    const toCreateQuestion = {
      content: "What is the capital of Nigeria?",
      question_type: "multiple_choice",
      alternatives: [
        {
          content: "Abuja",
          is_correct: true,
        },
        {
          content: "Lagos",
          is_correct: false,
        },
        {
          content: "Kano",
          is_correct: false,
        },
      ],
    };
    const res = await fetch(`${utils.BASE_URL}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(toCreateQuestion),
    });
    const question = await res.json();

    const deleteRes = await fetch(
      `${utils.BASE_URL}/questions/${question.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    const deletedQuestion = await deleteRes.json();
    const findRes = await fetch(`${utils.BASE_URL}/questions/${question.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const findQuestion = await findRes.json();

    expect(deleteRes.status).toBe(200);
    expect(findRes.status).toBe(404);
  });
});
