export class Test {
  constructor(
    readonly title: string,
    readonly teacherId: string,
    readonly questions: string[],
    readonly id?: string,
    readonly created_at?: string | Date | undefined,
    readonly updated_at?: string | Date | undefined
  ) {}

  addQuestion(questionId: string) {
    this.questions.push(questionId);
  }

  removeQuestion(questionId: string) {
    this.questions.map((question, index) => {
      if (question === questionId) {
        this.questions.splice(index, 1);
      }
    });
  }
}
