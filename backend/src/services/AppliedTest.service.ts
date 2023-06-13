import { prisma } from "../../prisma/client";

export class AppliedTestService {
  async apply(students_id: string[], test_id: string, available_until: Date) {
    console.log("[AppliedTestService] apply");
    try {
      await Promise.all(
        students_id.map(async (student_id) => {
          const appliedTest = await prisma.appliedTest.create({
            data: {
              student_id: student_id,
              test_id: test_id,
              available_until: available_until,
            },
          });
        })
      );
    } catch (error: any) {
      console.log("[AppliedTestService] apply" + error.message);
    }
  }
  async getAllByStudentId(studentId: string) {
    console.log(
      `[AppliedTestService] get all tests by student. studentId: ${studentId}`
    );
    return await prisma.appliedTest.findMany({
      where: {
        student_id: studentId,
        available_until: {
          gte: new Date(),
        },
      },
      include: {
        test: {
          include: {
            questions: {
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
        },
      },
    });
  }

  async getById(appliedTestId: string) {
    console.log(
      `[AppliedTestService] get test applied. appliedTestId: ${appliedTestId}`
    );
    return await prisma.appliedTest.findUnique({
      where: {
        id: appliedTestId,
      },
      include: {
        test: {
          include: {
            questions: {
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
        },
      },
    });
  }
}
