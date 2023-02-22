import { QuestionTrueOrFalseForm } from "../src/@domain/entities/Question/QuestionTypes/QuestionTrueOrFalseForm";

describe("@damoin/entities/QuestionTypes/QuestionTrueOrFalseForm", () => {
  it("should create a new question true or false form", () => {
    const questionTrueOrFalseForm = new QuestionTrueOrFalseForm({
      1: { text: "This is a question", isTrue: true },
      2: { text: "This is a question", isTrue: false },
    });
    expect(questionTrueOrFalseForm.questionType).toBe("true-false");
    expect(questionTrueOrFalseForm.alternatives).toEqual({
      1: { text: "This is a question", isTrue: true },
      2: { text: "This is a question", isTrue: false },
    });
  });
});
