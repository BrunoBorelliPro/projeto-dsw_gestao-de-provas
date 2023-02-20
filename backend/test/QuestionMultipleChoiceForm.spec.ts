import { QuestionMultipleChoiceForm } from "../src/@domain/entities/QuestionTypes/QuestionMultipleChoiceForm";

describe("@damoin/entities/QuestionTypes/QuestionMultipleChoiceForm", () => {
  it("should create a new question multiple choice form", () => {
    const questionMultipleChoiceForm = new QuestionMultipleChoiceForm({
      1: { text: "This is a question", isCorrect: true },
      2: { text: "This is a question", isCorrect: false },
    });
    expect(questionMultipleChoiceForm.questionType).toBe("multiple-choice");
    expect(questionMultipleChoiceForm.alternatives).toEqual({
      1: { text: "This is a question", isCorrect: true },
      2: { text: "This is a question", isCorrect: false },
    });
  });
  it("should throw an error when trying to create a question multiple choice form with more than one correct alternative", () => {
    expect(
      () =>
        new QuestionMultipleChoiceForm({
          1: { text: "This is a question", isCorrect: true },
          2: { text: "This is a question", isCorrect: true },
        })
    ).toThrowError("Only one alternative can be correct");
  });
  it("should throw an error when trying to create a question multiple choice form with no correct alternative", () => {
    expect(
      () =>
        new QuestionMultipleChoiceForm({
          1: { text: "This is a question", isCorrect: false },
          2: { text: "This is a question", isCorrect: false },
        })
    ).toThrowError("At least one alternative must be correct");
  });

  it("should return false when the wrong alternative is chosen", () => {
    const questionMultipleChoiceForm = new QuestionMultipleChoiceForm({
      1: { text: "This is a question", isCorrect: true },
      2: { text: "This is a question", isCorrect: false },
    });
  });
});
