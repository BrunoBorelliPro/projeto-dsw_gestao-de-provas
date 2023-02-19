import { BaseQuestionForm } from "./BaseQuestionForm";

export class QuestionMultipleChoiceForm extends BaseQuestionForm {
  constructor(alternatives: Alternatives) {
    super("multiple-choice");
    let count = 0;
    for (const alternative of Object.values(alternatives)) {
      if (alternative.isCorrect) {
        count++;
      }
    }
    if (count > 1) {
      throw new Error("Only one alternative can be correct");
    }
    if (count === 0) {
      throw new Error("At least one alternative must be correct");
    }
    this.alternatives = alternatives;
  }
  answer(answer: number): boolean {
    if (!this.alternatives[answer]) throw new Error("Invalid alternative");
    return this.alternatives[answer].isCorrect;
  }
  alternatives: Alternatives;
}
type Alternatives = {
  [id: number]: { text: string; isCorrect: boolean };
};
