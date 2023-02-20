import { BaseEntity } from "./BaseEntity";
import { QuestionData } from "./QuestionData";
import { BaseQuestionForm } from "./QuestionTypes/BaseQuestionForm";

export class Question extends BaseEntity {
  questionData: QuestionData;
  questionForm: BaseQuestionForm;
  constructor(
    questionData: QuestionData,
    questionForm: BaseQuestionForm,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this.questionData = questionData;
    this.questionForm = questionForm;
  }
}
