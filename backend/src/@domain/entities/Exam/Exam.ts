import { BaseEntity } from "../BaseEntity";
import { Question } from "../Question/Question";

export class Exam extends BaseEntity {
  questions: Array<Question>;
  constructor(
    questions: Array<Question>,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this.questions = questions;
  }
}
