import { BaseQuestionForm } from "./BaseQuestionForm";

export class QuestionEssayForm extends BaseQuestionForm {
  constructor(readonly text: string) {
    super("essay");
  }
}
