import { PrismaClient } from "@prisma/client";
import { Service } from "./Service";

export class AppliedTestService extends Service {
  async apply(
    students_id: string[],
    test_id: string,
    available_until: Date,
    teacherId: string
  ) {
    console.log("[AppliedTestService] apply");
    try {
      await Promise.all(
        students_id.map(async (student_id) => {
          const questions = await this.prisma.question.findMany({
            where: {
              tests: {
                some: {
                  id: test_id,
                },
              },
            },
            include: {
              alternatives: true,
            },
          });
          const findedTest = await this.prisma.test.findUnique({
            where: {
              id: test_id,
            },
          });
          if (!findedTest) throw new Error("Test not found");
          const appliedTest = await this.prisma.appliedTest.create({
            data: {
              student_id: student_id,
              test_id: test_id,
              title: findedTest.title,

              available_until: available_until,
              teacherId: teacherId,
            },
          });

          questions.forEach(async (question) => {
            console.log(question.content);
            await this.prisma.appliedTestQuestions.create({
              data: {
                appliedTestId: appliedTest.id,
                content: question.content,
                question_type: question.question_type,
                response: question.response,
                alternatives: {
                  create: question.alternatives.map((alternative) => {
                    return {
                      content: alternative.content,
                      is_correct: alternative.is_correct,
                    };
                  }),
                },
              },
            });
          });
        })
      );
    } catch (error: any) {
      console.log("[AppliedTestService] apply" + error.message);
    }
  }
  async getAllAvailableTestsByStudentId(studentId: string) {
    console.log(
      `[AppliedTestService] get all available tests by student. studentId: ${studentId}`
    );
    const tests = await this.prisma.appliedTest.findMany({
      where: {
        student_id: studentId,
        available_until: {
          gte: new Date(),
        },
        ResponseTest: {
          none: {},
        },
      },

      include: {
        applied_questions: {
          include: {
            alternatives: {
              select: {
                id: true,
                content: true,
              },
            },
          },
        },
      },
    });
    return tests;
  }

  async getAllByStudentId(studentId: string) {
    console.log(
      `[AppliedTestService] get all tests by student. studentId: ${studentId}`
    );
    const availableTests = await this.getAllAvailableTestsByStudentId(
      studentId
    );
    const testsDone = await this.prisma.appliedTest.findMany({
      where: {
        student_id: studentId,
        ResponseTest: {
          some: {},
        },
      },
      include: {
        ResponseTest: {
          include: {
            response_questions: {
              include: {
                alternatives: true,
              },
            },
          },
        },

        applied_questions: {
          include: {
            alternatives: {
              select: {
                id: true,
                content: true,
                is_correct: true,
              },
            },
          },
        },
      },
    });
    return {
      availableTests,
      testsDone,
    };
  }

  async getAllByTeacherId(teacherId: string) {
    console.log(
      `[AppliedTestService] get all tests by teacher. teacherId: ${teacherId}`
    );
    const tests = await this.prisma.appliedTest.findMany({
      where: {
        teacherId: teacherId,
      },
      select: {
        created_at: true,
        available_until: true,
        id: true,
        applied_questions: true,

        student: {
          select: {
            name: true,
          },
        },
        ResponseTest: {
          select: {
            grade: true,
          },
        },
      },
    });
    return tests;
  }

  async getByAppliedTestId(appliedTestId: string) {
    console.log(
      `[AppliedTestService] get test applied. appliedTestId: ${appliedTestId}`
    );
    const test = await this.prisma.appliedTest.findUnique({
      where: {
        id: appliedTestId,
      },
      include: {
        student: true,
        ResponseTest: {
          include: {
            response_questions: {
              include: {
                alternatives: true,
              },
            },
          },
        },

        applied_questions: {
          include: {
            alternatives: true,
          },
        },
      },
    });
    return test;
  }

  async getById(appliedTestId: string) {
    console.log(
      `[AppliedTestService] get test applied. appliedTestId: ${appliedTestId}`
    );
    return await this.prisma.appliedTest.findFirst({
      where: {
        id: appliedTestId,
        ResponseTest: {
          none: {},
        },
      },
      include: {
        applied_questions: {
          include: {
            alternatives: {
              select: {
                id: true,
                content: true,
              },
            },
          },
        },
      },
    });
  }

  async getAllMakedByStudentId(id: string) {
    console.log(`[AppliedTestService] get all maked by student. id: ${id}`);
    const tests = await this.prisma.appliedTest.findMany({
      where: {
        student_id: id,
        ResponseTest: {
          some: {},
        },
      },
      include: {
        applied_questions: {
          include: {
            alternatives: {
              select: {
                id: true,
                content: true,
                is_correct: true,
              },
            },
          },
        },
        ResponseTest: {
          include: {
            response_questions: {
              include: {
                alternatives: true,
              },
            },
          },
        },
        student: true,
        teacher: true,
      },
    });
    return tests;
  }
}
