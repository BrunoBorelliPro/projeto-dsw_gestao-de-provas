import { BaseQuestionForm } from "./BaseQuestionForm";

export class QuestionTrueOrFalseForm extends BaseQuestionForm {
  constructor(readonly alternatives: Alternatives) {
    super("true-false");
  }
}

type Alternatives = {
  [id: number]: { text: string; isTrue: boolean };
};
