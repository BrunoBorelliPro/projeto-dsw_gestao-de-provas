const request = require("supertest");
const appUrl = "http://localhost:8080";
describe("Questions", () => {
  it("should create a new question", () => {
    const question = {
      content: "What is the capital of Brazil?",
      question_type: "multiple_choice",

      alternatives: [
        {
          content: "São Paulo",
          is_correct: false,
        },
        {
          content: "Rio de Janeiro",
          is_correct: false,
        },
        {
          content: "Brasília",
          is_correct: true,
        },
      ],
    };
    return request(appUrl)
      .post("/questions")
      .send(question)
      .expect(201)
      .then((res: any) => {
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("content");
        expect(res.body).toHaveProperty("alternatives");
        expect(res.body.content).toEqual(question.content);
        expect(res.body.alternatives).toHaveLength(3);
      });
  });
});
