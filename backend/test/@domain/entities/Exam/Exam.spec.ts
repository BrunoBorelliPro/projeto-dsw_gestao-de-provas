import { Exam } from "../../../../src/@domain/entities/Exam/Exam";

describe("@domain/entities/Exam", () => {
  it("should be able to create a new exam", () => {
    const exam = new Exam([]);
    expect(exam.id).toBeDefined();
  });
});
