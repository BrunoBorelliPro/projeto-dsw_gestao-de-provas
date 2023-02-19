import { QuestionEssayForm } from "../src/@domain/entities/QuestionTypes/QuestionEssayForm";

describe("@damoin/entities/QuestionTypes/QuestionEssayForm", () => {
  it("should create a new question essay form", () => {
    const questionEssayForm = new QuestionEssayForm("This is a question");
    expect(questionEssayForm.text).toBe("This is a question");
    expect(questionEssayForm.questionType).toBe("essay");
  });
  it("should throw an error when trying to answer a question essay form", () => {
    const questionEssayForm = new QuestionEssayForm("This is a question");
    expect(() => questionEssayForm.answer(1)).toThrowError(
      "Essay questions don't have alternatives"
    );
  });
});
