import { prisma } from "../../prisma/client";

export class TestsStudentService {
  async getAllByStudentId(studentId: string) {
    console.log(
      `[TestsStudentService] get all tests by student. studentId: ${studentId}`
    );
    return await prisma.studentTest.findMany({
      where: {
        student_id: studentId,
        available_until: {
          lte: new Date(),
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

  async getByTestStudentId(studentTestId: string) {
    console.log(
      `[TestsStudentService] get test by student. studentTestId: ${studentTestId}`
    );
    return await prisma.studentTest.findUnique({
      where: {
        id: studentTestId,
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

  // async correction(studentTestId: string, studentId: string, answers: any) {
  //   console.log(
  //     `[TestsStudentService] correction. studentTestId: ${studentTestId}, studentId: ${studentId}`
  //   );

  //   const test = await prisma.studentTest.findUnique({
  //     where: {
  //       id: studentTestId,
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

  //   const studentTest = await prisma.studentTest.update({
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

  //   return studentTest;
  // }
}
