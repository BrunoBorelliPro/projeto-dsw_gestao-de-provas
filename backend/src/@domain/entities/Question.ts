import { BaseEntity } from "./BaseEntity";
import { QuestionData } from "./QuestionData";

export class Question extends BaseEntity {
  questionData: QuestionData;
  constructor(
    questionData: QuestionData,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this.questionData = questionData;
  }
}
