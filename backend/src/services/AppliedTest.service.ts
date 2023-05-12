import { prisma } from "../../prisma/client";

export class AppliedTestService {
  async apply(students_id: string[], test_id: string, available_until: Date) {
    console.log("[AppliedTestService] apply");
    try {
      await Promise.all(
        students_id.map(async (student_id) => {
          const appliedTest = await prisma.appliedTest.create({
            data: {
              grade: 0,
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

  async getByAppliedTestId(appliedTestId: string) {
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

  // async correction(appliedTestId: string, studentId: string, answers: any) {
  //   console.log(
  //     `[AppliedTestService] correction. appliedTestId: ${appliedTestId}, studentId: ${studentId}`
  //   );

  //   const test = await prisma.appliedTest.findUnique({
  //     where: {
  //       id: appliedTestId,
  //     },
  //     include: {
  //       test: {
  //         include: {
  //           questions: {
  //             include: {
  //               alternatives: {
  //                 select: {
  //                   id: true,
  //                   content: true,
  //                   is_correct: true,
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });

  //   if (!test) {
  //     throw new Error("Test not found");
  //   }

  //   let correctAnswers = 0;
  //   let wrongAnswers = 0;
  //   let emptyAnswers = 0;

  //   test?.test.questions.forEach((question) => {
  //     const answer = answers.find(
  //       (answer: any) => answer.questionId === question.id
  //     );
  //     if (answer) {
  //       if(question.question_type === "essay"){
  //         emptyAnswers++;
  //         return;
  //       }
  //       if(question.question_type === "true_false"){
  //         const alternative = question.alternatives.find(
  //           (alternative) => alternative.is_correct === answer.alternativeId
  //         );
  //         if (alternative) {
  //           correctAnswers++;
  //         } else {
  //           wrongAnswers++;
  //         }
  //         return;
  //       }
  //       const alternative = question.alternatives.find(
  //         (alternative) => alternative.id === answer.alternativeId
  //       );
  //       if (alternative?.is_correct) {
  //         correctAnswers++;
  //       } else {
  //         wrongAnswers++;
  //       }
  //     } else {
  //       emptyAnswers++;
  //     }
  //   });

  //   const grade = (correctAnswers * 10) / test?.test.questions.length;

  //   const appliedTest = await prisma.appliedTest.update({
  //     where: {
  //       test_id_student_id: {
  //         test_id: testId,
  //         student_id: studentId,
  //       },
  //     },
  //     data: {
  //       grade: grade,
  //       correct_answers: correctAnswers,
  //       wrong_answers: wrongAnswers,
  //       empty_answers: emptyAnswers,
  //       available_until: new Date(),
  //     },
  //   });

  //   return appliedTest;
  // }
}
