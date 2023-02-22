import { Exam } from "../entities/Exam/Exam";

export interface IExamRepository {
  save(exam: Exam): Promise<void>;
  findById(id: string): Promise<Exam>;
  findAll(): Promise<Exam[]>;
  findByQuestionId(questionId: string): Promise<Exam[]>;
}
