import { BaseQuestionForm } from "./BaseQuestionForm";

export class QuestionTrueOrFalseForm extends BaseQuestionForm {
  constructor(readonly alternatives: Alternatives) {
    super("true-false");
  }

  answer(
    answers: { id: number; isTrue: boolean }[]
  ): { id: number; isRight: boolean }[] {
    const correctAnswers = answers.map((answer) => {
      const alternative = this.alternatives[answer.id];
      if (!alternative) {
        throw new Error("Invalid alternative");
      }
      return { id: answer.id, isRight: alternative.isTrue === answer.isTrue };
    });
    return correctAnswers;
  }
}

type Alternatives = {
  [id: number]: { text: string; isTrue: boolean };
};
