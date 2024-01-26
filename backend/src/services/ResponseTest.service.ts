import {
  Alternative,
  Question,
  ResponseAlternative,
  ResponseTest,
  ResponseQuestion as ResponseQuestionType,
  PrismaClient,
  AppliedTestQuestions,
  AppliedTestAlternatives,
} from "@prisma/client";
import { Service } from "./Service";

type ResponseQuestion = {
  questionId: string;
  question_type: string;
  response: string | [string];
};

export class ResponseTestService extends Service {
  async create(
    appliedTestId: string,
    responses: ResponseQuestion[],
    studentId: string
  ) {
    console.log(`[ResponseTestService] responseTest: ${appliedTestId}`);

    const responseTest = await this.prisma.responseTest.create({
      data: {
        applied_test_id: appliedTestId,
        grade: 0,
        studentId: studentId,
      },
    });
    console.log(`[ResponseTestService] responseTest: ${responseTest.id}`);
    for (const response of responses) {
      if (response.question_type === "multiple_choice") {
        await this.insertMultipleChoiceResponse(responseTest, response);
        console.log(`[ResponseTestService] Multiple Choice Response inserted`);
      } else if (response.question_type === "true_false") {
        await this.insertTrueFalseResponse(responseTest, response);
        console.log(`[ResponseTestService] True False Response inserted`);
      } else if (response.question_type === "essay") {
        await this.insertEssayResponse(responseTest, response);
        console.log(`[ResponseTestService] Essay Response inserted`);
      } else {
        throw new Error("Invalid question type");
      }
    }

    return await this.calculateGrade(responseTest.id);
  }

  private async insertEssayResponse(
    responseTest: ResponseTest,
    responseQuestion: ResponseQuestion
  ) {
    const response = await this.prisma.responseQuestion.create({
      data: {
        response: responseQuestion.response as string,
        question_id: responseQuestion.questionId,
        responseTestId: responseTest.id,
      },
    });
    return response;
  }

  private async insertMultipleChoiceResponse(
    responseTest: ResponseTest,
    responseQuestion: ResponseQuestion
  ) {
    const alternative = responseQuestion.response as string;
    if (!alternative) {
      console.log("alternative is empty");
      return;
    }
    const response = await this.prisma.responseQuestion.create({
      data: {
        question_id: responseQuestion.questionId,
        responseTestId: responseTest.id,
      },
    });

    const responseAlternative = await this.prisma.responseAlternative.create({
      data: {
        alternative_id: alternative,
        is_selected: true,
        response_question_id: response.id,
      },
    });

    return response;
  }

  private async insertTrueFalseResponse(
    responseTest: ResponseTest,
    responseQuestion: ResponseQuestion
  ) {
    const alternatives = responseQuestion.response as [string];

    const response = await this.prisma.responseQuestion.create({
      data: {
        question_id: responseQuestion.questionId,
        responseTestId: responseTest.id,
      },
    });
    console.log(alternatives);

    for (const alternative of alternatives) {
      await this.prisma.responseAlternative.create({
        data: {
          response_question_id: response.id,
          alternative_id: alternative,
          is_selected: true,
        },
      });
    }

    return response;
  }

  private async calculateGrade(responseTestId: string) {
    console.log(`[ResponseTestService] calculateGrade: ${responseTestId}`);

    const responseTest = await this.prisma.responseTest.findUnique({
      where: {
        id: responseTestId,
      },
      include: {
        response_questions: {
          include: {
            alternatives: true,
          },
        },
        applied_test: {
          include: {
            applied_questions: {
              include: {
                alternatives: true,
              },
            },
          },
        },
      },
    });

    if (!responseTest) throw new Error("Response test not found");

    let grade = 0;

    for (const question of responseTest.applied_test.applied_questions) {
      const responseQuestion = responseTest.response_questions.find(
        (responseQuestion) => responseQuestion.question_id === question.id
      );
      if (!responseQuestion) continue;
      if (question.question_type === "multiple_choice") {
        grade += this.calculateMultipleChoiceGrade(question, responseQuestion);
      } else if (question.question_type === "true_false") {
        grade += this.calculateTrueFalseGrade(question, responseQuestion);
      } else if (question.question_type === "essay") {
        grade += this.calculateEssayGrade(question, responseQuestion);
      } else {
        throw new Error("Invalid question type");
      }
    }

    console.log(`[ResponseTestService] grade: ${grade}`);

    return await this.prisma.responseTest.update({
      where: {
        id: responseTestId,
      },
      data: {
        grade,
      },
    });
  }

  private calculateMultipleChoiceGrade(
    question: AppliedTestQuestions & {
      alternatives: AppliedTestAlternatives[];
    },
    responseQuestion: ResponseQuestionType & {
      alternatives: ResponseAlternative[];
    }
  ) {
    console.log(
      `[ResponseTestService] calculateMultipleChoiceGrade: ${responseQuestion}`
    );

    const correctAlternative = question.alternatives.find(
      (alternative) => alternative.is_correct
    );

    if (!correctAlternative) throw new Error("Correct alternative not found");

    if (responseQuestion.alternatives.length === 1) {
      if (
        responseQuestion.alternatives[0].alternative_id ===
        correctAlternative.id
      ) {
        return 1;
      }
    }

    return 0;
  }

  private calculateTrueFalseGrade(
    question: AppliedTestQuestions & {
      alternatives: AppliedTestAlternatives[];
    },
    responseQuestion: ResponseQuestionType & {
      alternatives: ResponseAlternative[];
    }
  ) {
    console.log(
      `[ResponseTestService] calculateTrueFalseGrade: ${responseQuestion}`
    );

    const correctAlternatives = question.alternatives.filter(
      (alternative) => alternative.is_correct
    );

    if (correctAlternatives.length <= 0)
      throw new Error("Correct alternative not found");

    let grade = 0;
    const maxGrade = 1;
    const pointsPerAlternative = maxGrade / question.alternatives.length;
    question.alternatives.forEach((alternative) => {
      const responseAlternative = responseQuestion.alternatives.find(
        (responseAlternative) =>
          responseAlternative.alternative_id === alternative.id
      );
      if (!responseAlternative) {
        if (!alternative.is_correct) {
          grade += pointsPerAlternative;
        }
        return;
      }
      if (responseAlternative) {
        if (alternative.is_correct) {
          grade += pointsPerAlternative;
        }
      }
    });

    return grade;
  }

  private calculateEssayGrade(
    question: AppliedTestQuestions & {
      alternatives: AppliedTestAlternatives[];
    },
    responseQuestion: ResponseQuestionType & {
      alternatives: ResponseAlternative[];
    }
  ) {
    console.log(
      `[ResponseTestService] calculateEssayGrade: ${responseQuestion}`
    );

    if (responseQuestion.response === question.response) {
      return 1;
    }

    return 0;
  }
}
