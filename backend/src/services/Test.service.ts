import { PrismaClient } from "@prisma/client";
import { Test } from "../entities/Test/Test";
import { Service } from "./Service";

export class TestService extends Service {
  async getById(id: string) {
    console.log(`[TestService] get test: ${id}`);
    const findedTest = await this.prisma.test.findUnique({
      where: {
        id: id,
      },
      include: {
        questions: {
          include: {
            alternatives: true,
          },
        },
      },
    });
    return findedTest;
  }

  async getAll() {
    console.log(`[TestService] get all tests`);
    return await this.prisma.test.findMany({
      include: {
        questions: {
          include: {
            alternatives: true,
          },
        },
      },
    });
  }

  async create(test: Test) {
    console.log(`[TestService] create test`);
    const questions = test.questions.map((id) => {
      return { id: id };
    });

    this.validateTest(test);

    const createdTest = await this.prisma.test.create({
      data: {
        title: test.title,
        teacher: {
          connect: { id: test.teacherId },
        },
        questions: {
          connect: questions,
        },
      },
    });
    return await this.prisma.test.findUnique({
      where: { id: createdTest.id },
      include: { questions: { include: { alternatives: true } } },
    });
  }

  async update(id: string, test: Test) {
    console.log(`[TestService] update test: ${id}`);

    const foundedTest = await this.prisma.test.findUnique({
      where: { id: id },
    });

    if (!foundedTest) {
      return;
    }

    this.validateTest(test);

    const questionsIds = test.questions.map((id) => {
      return { id: id };
    });
    await this.prisma.test.update({
      where: { id: id },
      data: {
        title: test.title,
        questions: {
          set: questionsIds,
        },
      },
    });

    return await this.prisma.test.findUnique({
      where: { id: id },
      include: { questions: { include: { alternatives: true } } },
    });
  }

  async delete(id: string) {
    console.log(`[TestService] delete test: ${id}`);

    await this.prisma.test.delete({
      where: { id: id },
    });
  }

  private validateTest(test: Test) {
    if (test.title === "") {
      throw new Error("Title is required");
    }
    if (test.questions.length < 1) {
      throw new Error("Number of questions must be greater than 0");
    }

    if (test.teacherId === "") {
      throw new Error("Teacher is required");
    }
  }
}
