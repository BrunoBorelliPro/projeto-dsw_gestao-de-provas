import { QuestionEssayForm } from "../src/@domain/entities/QuestionTypes/QuestionEssayForm";

describe("@damoin/entities/QuestionTypes/QuestionEssayForm", () => {
  it("should create a new question essay form", () => {
    const questionEssayForm = new QuestionEssayForm("This is a question");
    expect(questionEssayForm.text).toBe("This is a question");
    expect(questionEssayForm.questionType).toBe("essay");
  });
});
