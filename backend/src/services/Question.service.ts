import { PrismaClient } from "@prisma/client";
import { Alternative } from "../entities/Alternative/Alternative";
import { Question } from "../entities/Question/Question";
import { Service } from "./Service";

export class QuestionService extends Service {
  async getById(id: string) {
    console.log(`[QuestionService] get question: ${id}`);
    return await this.prisma.question.findUnique({
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
    return await this.prisma.question.findMany({
      include: {
        alternatives: true,
      },
    });
  }
  async create(question: Question) {
    console.log(`[QuestionService] create question`);

    let alternatives: Alternative[] = question.alternatives;

    this.validateQuestion(question);

    const createdQuestion = await this.prisma.question.create({
      data: {
        content: question.content,
        question_type: question.question_type,

        response: question.response ? question.response : null,

        alternatives: {
          create: [...alternatives],
        },
      },
    });
    return await this.prisma.question.findUnique({
      where: { id: createdQuestion.id },
      include: { alternatives: true },
    });
  }

  async update(id: string, question: Question) {
    console.log(`[QuestionService] update question: ${id}`);

    const foundedQuestion = await this.prisma.question.findUnique({
      where: { id: id },
    });

    if (foundedQuestion === null) {
      throw new Error("Question not found");
    }

    this.validateQuestion(question);

    await this.prisma.alternative.deleteMany({
      where: {
        question_id: id,
      },
    });
    console.log("alternatives");
    console.log(question);

    const alternatives = question.alternatives.map((alternative) => {
      return {
        content: alternative.content,
        is_correct: alternative.is_correct,
      };
    });

    const updatedQuestion = await this.prisma.question.update({
      where: { id: id },
      data: {
        content: question.content,
        question_type: question.question_type,
        response: question.response ? question.response : null,
        alternatives: {
          create: alternatives,
        },
      },
    });
    return await this.prisma.question.findUnique({
      where: { id: updatedQuestion.id },
      include: { alternatives: true },
    });
  }

  async delete(id: string) {
    console.log(`[QuestionService] delete question: ${id}`);
    await this.prisma.alternative.deleteMany({
      where: {
        question_id: id,
      },
    });

    await this.prisma.question.delete({
      where: {
        id: id,
      },
    });
  }

  private validateQuestion(question: Question) {
    if (
      question.question_type === "multiple_choice" ||
      question.question_type === "true_false"
    ) {
      if (question.alternatives.length < 2) {
        throw new Error("Question must have at least 2 alternatives");
      }
      let hasCorrectAlternative = false;
      for (let alternative of question.alternatives) {
        if (alternative.is_correct) {
          hasCorrectAlternative = true;
          break;
        }
      }
      if (!hasCorrectAlternative) {
        throw new Error("Question must have at least 1 correct alternative");
      }
    }

    if (
      question.question_type === "essay" &&
      question.alternatives.length > 0
    ) {
      throw new Error("Essay questions cannot have alternatives");
    }

    if (question.question_type === "essay" && !question.response) {
      throw new Error("Essay questions must have a response");
    }
  }
}
