import { type } from "os";

export abstract class BaseQuestionForm {
  constructor(readonly questionType: QuestionType) {}
  abstract answer(answer: any): any;
}

type QuestionType = "essay" | "multiple-choice" | "true-false";
