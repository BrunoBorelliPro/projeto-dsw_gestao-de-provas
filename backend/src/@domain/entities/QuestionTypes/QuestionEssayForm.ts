import { BaseQuestionForm } from "./BaseQuestionForm";

export class QuestionEssayForm extends BaseQuestionForm {
  constructor(readonly text: string) {
    super("essay");
  }
  answer(answer: any): void {
    throw new Error("Essay questions don't have alternatives");
  }
}
