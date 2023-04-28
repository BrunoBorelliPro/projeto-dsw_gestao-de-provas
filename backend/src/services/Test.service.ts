import { prisma } from "../../prisma/client";
import { Test } from "../entities/Test/Test";

export class TestService {
  async getById(id: string) {
    console.log(`[TestService] get test: ${id}`);
    const findedTest = await prisma.test.findUnique({
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
    return await prisma.test.findMany({
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

    const createdTest = await prisma.test.create({
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
    return await prisma.test.findUnique({
      where: { id: createdTest.id },
      include: { questions: { include: { alternatives: true } } },
    });
  }

  async update(id: string, test: Test) {
    console.log(`[TestService] update test: ${id}`);

    const foundedTest = await prisma.test.findUnique({
      where: { id: id },
    });

    if (foundedTest === null) {
      throw new Error("Test not found");
    }

    this.validateTest(test);

    const questionsIds = test.questions.map((id) => {
      return { id: id };
    });

    await prisma.test.update({
      where: { id: id },
      data: {
        title: test.title,
        questions: {
          connect: questionsIds,
        },
      },
    });

    return await prisma.test.findUnique({
      where: { id: id },
      include: { questions: { include: { alternatives: true } } },
    });
  }

  async delete(id: string) {
    console.log(`[TestService] delete test: ${id}`);

    const foundedTest = await prisma.test.findUnique({
      where: { id: id },
    });

    await prisma.test.delete({
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
