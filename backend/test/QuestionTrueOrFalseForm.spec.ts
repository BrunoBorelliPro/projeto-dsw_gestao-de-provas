import { QuestionTrueOrFalseForm } from "../src/@domain/entities/QuestionTypes/QuestionTrueOrFalseForm";

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
  it("should throw an error when trying to answer a question true or false form with an invalid alternative", () => {
    const questionTrueOrFalseForm = new QuestionTrueOrFalseForm({
      1: { text: "This is a question", isTrue: true },
      2: { text: "This is a question", isTrue: false },
    });
    const answer = [{ id: 3, isTrue: true }];
    expect(() => questionTrueOrFalseForm.answer(answer)).toThrowError(
      "Invalid alternative"
    );
  });
  it("should return the correct answer when answering a question true or false form", () => {
    const questionTrueOrFalseForm = new QuestionTrueOrFalseForm({
      1: { text: "This is a question", isTrue: true },
      2: { text: "This is a question", isTrue: false },
    });
    const answer = [
      { id: 1, isTrue: true },
      { id: 2, isTrue: false },
    ];
    expect(questionTrueOrFalseForm.answer(answer)).toEqual([
      { id: 1, isRight: true },
      { id: 2, isRight: true },
    ]);
  });
  it("should return the incorrect answer when answering a question true or false form", () => {
    const questionTrueOrFalseForm = new QuestionTrueOrFalseForm({
      1: { text: "This is a question", isTrue: true },
      2: { text: "This is a question", isTrue: false },
    });
    const answer = [
      { id: 1, isTrue: false },
      { id: 2, isTrue: true },
    ];
    expect(questionTrueOrFalseForm.answer(answer)).toEqual([
      { id: 1, isRight: false },
      { id: 2, isRight: false },
    ]);
  });
});
