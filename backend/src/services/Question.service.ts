import { prisma } from "../../prisma/client";
import { Alternative } from "../entities/Alternative/Alternative";
import { Question } from "../entities/Question/Question";

export class QuestionService {
  async getById(id: string) {
    console.log(`[QuestionService] get question: ${id}`);
    return await prisma.question.findUnique({
      where: {
        id: id,
      },
      include: {
        alternatives: true,
      },
    });
  }
  async getAll() {
    console.log(`[QuestionService] get all questions`);
    return await prisma.question.findMany({
      include: {
        alternatives: true,
      },
    });
  }
  async create(question: Question) {
    console.log(`[QuestionService] create question`);

    const alternatives: Alternative[] = question.alternatives;

    const createdQuestion = await prisma.question.create({
      data: {
        content: question.content,
        question_type: question.question_type,
        alternatives: {
          create: [...alternatives],
        },
      },
    });
    return await prisma.question.findUnique({
      where: { id: createdQuestion.id },
      include: { alternatives: true },
    });
  }

  async update(id: string, question: Question) {
    console.log(`[QuestionService] update question: ${id}`);

    const foundedQuestion = await prisma.question.findUnique({
      where: { id: id },
    });

    if (foundedQuestion === null) {
      throw new Error("Question not found");
    }

    await prisma.alternative.deleteMany({
      where: {
        question_id: id,
      },
    });

    const alternatives = question.alternatives.map((alternative) => {
      return {
        content: alternative.content,
        is_correct: alternative.is_correct,
      };
    });

    const updatedQuestion = await prisma.question.update({
      where: { id: id },
      data: {
        content: question.content,
        question_type: question.question_type,

        alternatives: {
          create: alternatives,
        },
      },
    });
    return await prisma.question.findUnique({
      where: { id: updatedQuestion.id },
      include: { alternatives: true },
    });
  }

  async delete(id: string) {
    console.log(`[QuestionService] delete question: ${id}`);
    await prisma.alternative.deleteMany({
      where: {
        question_id: id,
      },
    });

    await prisma.question.delete({
      where: {
        id: id,
      },
    });
  }
}
