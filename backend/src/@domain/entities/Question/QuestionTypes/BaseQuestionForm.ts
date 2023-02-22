export abstract class BaseQuestionForm {
  constructor(readonly questionType: QuestionType) {}
}

type QuestionType = "essay" | "multiple-choice" | "true-false";
