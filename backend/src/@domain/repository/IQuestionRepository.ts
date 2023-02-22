import { Question } from "../entities/Question/Question";

export interface IQuestionRepository {
  save(question: Question): Promise<void>;
  findById(id: string): Promise<Question>;
  findAll(): Promise<Question[]>;
  findByQuestionData(questionData: string): Promise<Question>;
}
